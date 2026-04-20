'use client'

import Link from 'next/link';
import { useEffect, useState } from 'react';
import UserDropdown from './UserDropdown';

export default function AuthButton() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const token = document.cookie
      .split('; ')
      .find((row) => row.startsWith('token='));
    setIsLoggedIn(!!token);
  }, []);

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