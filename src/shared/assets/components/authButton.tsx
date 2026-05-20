'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { logout, getAuthStatus } from '@/shared/actions/authService';
import UserDropdown from './UserDropdown';

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setIsChecking(true);
    getAuthStatus()
      .then(setIsLoggedIn)
      .finally(() => setIsChecking(false));
  }, [pathname]);

  useEffect(() => {
    if (!isLoggedIn) return;

    const checkToken = async () => {
      const stillLoggedIn = await getAuthStatus();
      if (!stillLoggedIn) {
        setIsLoggedIn(false);
        await logout();
        router.replace('/auth/login');
      }
    };

    const interval = setInterval(checkToken, 30000);
    return () => clearInterval(interval);
  }, [isLoggedIn, router]);

  if (isChecking) return null;

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