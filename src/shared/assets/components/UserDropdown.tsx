'use client'

import { useRef, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { logout } from '@/shared/actions/authService';
import { Icon } from '@iconify/react';

export default function UserDropdown() {
  const [open, setOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const res = await logout();
      if (res.success) {
        message.success(res.message);
        router.replace('/auth/login');
      } else {
        message.error(res.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div ref={ref} className='relative'>
      <button
        onClick={() => setOpen(!open)}
        className='flex items-center gap-2'
      >
        <div className='w-9 h-9 rounded-full bg-gradient-to-r from-Kzen-primary to-Kzen-secondary flex items-center justify-center text-white font-semibold'>
          U
        </div>
        <Icon icon="basil:caret-down-outline" width="24" height="24" className='text-Kzen-dark'/>
      </button>

      {open && (
        <div className='absolute right-0 mt-2 bg-white shadow-lg rounded-xl py-2 min-w-[160px] z-50'>
          <a
            href='/user/profile'
            className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100 text-gray-700'
          >
            <Icon icon="gravity-ui:person" width="16" height="16"/>
            <span>Profil</span>
          </a>
          <button
            onClick={handleLogout}
            disabled={isLoading}
            className='flex items-center gap-2 px-4 py-2 w-full hover:bg-gray-100 text-gray-700 disabled:opacity-50'
          >
            <Icon icon="ic:baseline-logout" width="16" height="16"/>
            <span>{isLoading ? 'Logging out...' : 'Log out'}</span>
          </button>
        </div>
      )}
    </div>
  );
}