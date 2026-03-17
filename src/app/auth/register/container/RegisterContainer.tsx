'use client'

import React, { useState } from 'react';
import { useForm } from 'antd/es/form/Form';
import RegisterForm from './form/RegisterForm';
import OTPModal from './modal/OTPModal';
import { useHandleRegisterMutate } from './usecase/useHandleRegisterMutate';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.png';
import { Button, Divider } from 'antd';
import { Icon } from '@iconify/react';

export default function RegisterContainer() {
  const [form] = useForm();
  const [showOTP, setShowOTP] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState('');

  const { handleMutate, isPending } = useHandleRegisterMutate(form, (email) => {
    setRegisteredEmail(email);
    setShowOTP(true);
  });

  const handleGoogleRegister = () => {
    window.location.href = `https://api.kzen.biz.id/api/v1/auth/google`;
  };

  return (
    <div className='space-y-4 w-full text-center'>
      <Image src={Logo} alt="Logo" width={150} className='mx-auto' />

      <h1 className='font-semibold text-2xl'>Daftar ke Akun K-Zen</h1>
      <h2 className='font-extralight opacity-60 text-xl'>We Guide You #FromZerotoGlobal</h2>

      <RegisterForm
        form={form}
        handleMutate={handleMutate}
        isLoading={isPending}
      />

      <Divider plain className='!text-gray-400'>Atau</Divider>

      <Button
        size="large"
        className="w-full rounded-full"
        icon={<Icon icon="flat-color-icons:google" width={20} />}
        onClick={handleGoogleRegister}
      >
        Daftar dengan Google
      </Button>

      <p className='text-gray-500'>
        Sudah Punya Akun?{' '}
        <a href="/auth/login" className='text-Kzen-primary underline font-medium hover:text-Kzen-secondary'>
          Masuk
        </a>
      </p>

      <OTPModal
        open={showOTP}
        email={registeredEmail}
        onClose={() => setShowOTP(false)}
      />
    </div>
  );
}