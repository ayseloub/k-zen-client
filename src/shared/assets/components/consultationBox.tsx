'use client';

import React, { useState, useRef, useEffect } from 'react';
import { PhoneFilled, DownOutlined } from '@ant-design/icons';

export default function ConsultationBox() {
  const services = [
    'program 1',
    'program 2',
    'program 3',
  ];

  const [service, setService] = useState('');
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="border border-opacity-50 rounded-lg mt-5 space-y-5 p-4">
      <h1 className="text-xl font-medium">Konsultasi Awal Gratis!</h1>

      <section className="flex gap-2 mt-4">
        <div className="w-full">
          <p className="mb-2">Nomor WhatsApp</p>
          <div className="relative">
            <PhoneFilled className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="border border-gray-300 rounded-full p-2 pl-10 w-full"
              placeholder="+62837284792"
            />
          </div>
        </div>


        <div className="w-full" ref={dropdownRef}>
          <p className="mb-2">Jenis Layanan</p>

          <div
            onClick={() => setOpen(!open)}
            className="relative border border-gray-300 rounded-full p-2 pl-4 pr-10 cursor-pointer bg-white"
          >
            {service || (
              <span className="text-gray-400">Pilihan Program</span>
            )}

            <DownOutlined className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          {open && (
            <div className="absolute mt-2 bg-white shadow-lg rounded-md w-fit z-50">
              {services.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    setService(item);
                    setOpen(false);
                  }}
                  className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>
      <button className='bg-gradient-to-r from-Kzen-secondary to-Kzen-primary text-white px-4 py-2 rounded-full w-full hover:bg-opacity-90'>
        Dapatkan Penawaran Spesial
      </button>
    </div>
  );
}
