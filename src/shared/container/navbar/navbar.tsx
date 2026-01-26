'use client';

import { useState, useRef, useEffect } from 'react';
import { NavigationList } from '@/shared/models/static/NavigationList';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.png';
import ReactCountryFlag from 'react-country-flag';
import { CaretDownOutlined } from '@ant-design/icons';
import AuthButton from '@/shared/assets/components/authButton';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const languages = [
    { code: 'id', label: 'Indonesia', flag: 'ID' },
    { code: 'en', label: 'English', flag: 'US' },
  ];

  const [currentLang, setCurrentLang] = useState(languages[0]);
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (langRef.current && !langRef.current.contains(e.target as Node)) {
        setOpenLang(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className="border border-opacity-50 flex mt-4 items-center justify-between p-4 rounded-full mx-48 bg-white shadow-lg">
      
      <section>
        <a href="/" className="text-xl font-bold">
          <Image src={Logo} alt="Logo" width={110} />
        </a>
      </section>

      <section className="flex gap-6">
        {NavigationList.map((item) => (
          <div
            key={item.title}
            className="relative"
            onMouseEnter={() => item.children && setOpenDropdown(item.title)}
            onMouseLeave={() => setOpenDropdown(null)}
          >
            {item.children ? (
              <>
                <a href={item.href} >
                  <button className="hover:text-blue-600 font-medium">
                    {item.title} <CaretDownOutlined />
                  </button>  
                </a>

                {openDropdown === item.title && (
                  <div className="absolute left-0 top-full mt-0 bg-white shadow-lg rounded-md min-w-[200px] py-2 z-50">
                    {item.children.map((child) => (
                      <a
                        key={child.title}
                        href={child.href}
                        className="block px-4 py-2 hover:bg-gray-100 whitespace-nowrap"
                      >
                        {child.title}
                      </a>
                    ))}
                  </div>
                )}
              </>
            ) : (
              <a href={item.href} className="hover:text-blue-600 font-medium">
                {item.title}
              </a>
            )}
          </div>
        ))}
      </section>

      <section ref={langRef} className="relative flex gap-6 items-center">
        <div>
          <button
            onClick={() => setOpenLang(!openLang)}
            className="flex items-center justify-center w-10 gap-2 h-10"
          >
            <ReactCountryFlag
              svg
              countryCode={currentLang.flag}
              style={{ width: '1.4em', height: '1.4em' }}
              className=''
            /> 
            <CaretDownOutlined />
          </button>

          {openLang && (
            <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md py-2 min-w-[160px] z-50">
              {languages.map((lang) => (
                <button
                  key={lang.code}
                  onClick={() => {
                    setCurrentLang(lang);
                    setOpenLang(false);
                  }}
                  className="flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-left"
                >
                  <ReactCountryFlag svg countryCode={lang.flag} />
                  <span>{lang.label}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        <div className='text-Kzen-light'>
          <AuthButton />
        </div>
      </section>
    </nav>
  );
}
