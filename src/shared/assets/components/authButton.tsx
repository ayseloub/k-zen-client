'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { logout } from '@/shared/actions/authService';
import UserDropdown from './UserDropdown';

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (!isLoggedIn) return;

    const checkToken = () => {
      const token = document.cookie
        .split('; ')
        .find((row) => row.startsWith('token='));

      if (!token) {
        setIsLoggedIn(false);
        logout();
        router.replace('/auth/login');
      }
    };

    const interval = setInterval(checkToken, 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn, router]);

  if (isLoggedIn) {
    return <UserDropdown />;
  }

  return (
    <Link href="/auth/login">
      <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary hover:opacity-70 px-4 py-2 rounded-full'>
        Masuk
      </button>
    </Link>
  );
}