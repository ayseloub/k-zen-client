'use client'

import { useForm } from 'antd/es/form/Form';
import LoginForm from './form/LoginForm';
import { useHandleLoginMutate } from './usecase/useHandleLoginMutate';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.png';
import { Button, Divider } from 'antd';
import { Icon } from '@iconify/react';

export default function LoginContainer() {
  const [form] = useForm();
  const { handleMutate, isPending } = useHandleLoginMutate(form);

  const handleGoogleLogin = () => {
  window.location.href = `https://api.kzen.biz.id/api/v1/auth/google`;
    };

  return (
    <div className='space-y-4 w-full text-center'>
      <Image
        src={Logo}
        alt="Logo"
        width={150}
        className='mx-auto'
      />

      <h1 className='font-semibold text-2xl'>Masuk ke Akun K-Zen</h1>
      <h2 className='font-extralight opacity-60 text-xl'>We Guide You #FromZerotoGlobal</h2>

      <LoginForm
        form={form}
        handleMutate={handleMutate}
        isLoading={isPending}
      />

      <Divider plain className='!text-gray-400'>Atau</Divider>

      <Button
        size="large"
        className="w-full rounded-full"
        icon={<Icon icon="flat-color-icons:google" width={20} />}
        onClick={handleGoogleLogin}
      >
        Masuk dengan Google
      </Button>

      <p className='text-gray-500'>
        Belum Punya Akun?{' '}
        <a href="/auth/register" className='text-Kzen-primary underline font-medium hover:text-Kzen-secondary'>
          Daftar
        </a>
      </p>
    </div>
  );
}