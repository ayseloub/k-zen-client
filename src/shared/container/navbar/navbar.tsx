'use client';

import { useState, useRef, useEffect } from 'react';
import { NavigationList } from '@/shared/models/static/NavigationList';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.png';
import ReactCountryFlag from 'react-country-flag';
import { CaretDownOutlined, CaretUpOutlined } from '@ant-design/icons';
import AuthButton from '@/shared/assets/components/authButton';

export default function Navbar() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState({ code: 'id', label: 'Indonesia', flag: 'ID' });
  const [openLang, setOpenLang] = useState(false);
  const langRef = useRef<HTMLDivElement>(null);

  const languages = [
    { code: 'id', label: 'Indonesia', flag: 'ID' },
    { code: 'en', label: 'English', flag: 'US' },
  ];

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
                <button className="hover:text-blue-600 font-medium flex items-center gap-1">
                  {item.title}
                  {openDropdown === item.title ? <CaretUpOutlined /> : <CaretDownOutlined />}
                </button>

                {openDropdown === item.title && (
  <div className="absolute left-1/2 -translate-x-1/2 top-full bg-white shadow-xl rounded-2xl w-[1000px] px-6 z-50">
    <div className={`grid ${item.title === 'Produk' ? 'grid-cols-3' : 'grid-cols-2'} gap-4`}>
      {item.children.map((child) => (
        <a
          key={child.title}
          href={child.href}
          className="flex items-start gap-3 p-4 hover:bg-gray-50 rounded-xl transition-colors"
        >
          {child.icon && (
            <div className="w-32 h-32">
              <Image
                src={child.icon}
                alt={child.title}
                width={64}
                height={64}
              />
            </div>
          )}
          <div className="flex flex-col gap-1">
            <h3 className="font-semibold text-gray-900">{child.title}</h3>
            {child.description && (
              <p className="text-sm text-gray-600 leading-relaxed">{child.description}</p>
            )}
          </div>
        </a>
      ))}
    </div>
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
            <ReactCountryFlag svg countryCode={currentLang.flag} style={{ width: '1.4em', height: '1.4em' }} />
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
        <div className="text-Kzen-light">
          <AuthButton />
        </div>
      </section>
    </nav>
  );
}