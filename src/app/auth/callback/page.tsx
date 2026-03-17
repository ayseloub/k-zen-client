'use client'

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { googleCallback } from '@/shared/actions/authService';
import { message } from 'antd';
import { Spin } from 'antd';

export default function CallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const code = searchParams.get('code');

    if (!code) {
      message.error('Kode tidak ditemukan');
      router.replace('/auth/login');
      return;
    }

    const handleCallback = async () => {
      const res = await googleCallback(code);
      if (res.success) {
        message.success(res.message);
        router.replace('/home');
      } else {
        message.error(res.message);
        router.replace('/auth/login');
      }
    };

    handleCallback();
  }, []);

  return (
    <div className='flex items-center justify-center min-h-screen'>
      <Spin size='large' tip='Memproses login...' />
    </div>
  );
}