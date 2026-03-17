'use client'

import { Button, Modal, message } from 'antd';
import { useRouter } from 'next/navigation';
import React, { useRef, useState, useEffect } from 'react';
import { verifyOTP, resendVerification } from '@/shared/actions/authService';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import OwlSuccess from '@/shared/assets/images/Owl;.png'; // sesuaikan nama file

interface IOTPModal {
  open: boolean;
  email: string;
  onClose: () => void;
}

export default function OTPModal({ open, email, onClose }: IOTPModal) {
  const router = useRouter();
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const [isSuccess, setIsSuccess] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    if (!open) return;
    setCountdown(60);
    setIsSuccess(false);
    setOtp(Array(6).fill(''));
  }, [open]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleSubmit = async () => {
    const otpCode = otp.join('');
    if (otpCode.length < 6) return;
    setIsPending(true);
    try {
      const res = await verifyOTP({ email, otp: otpCode });
      if (res.success) {
        message.success(res.message);
        setIsSuccess(true);
      } else {
        message.error(res.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await resendVerification({ email });
      if (res.success) {
        message.success(res.message);
        setOtp(Array(6).fill(''));
        setCountdown(60);
      } else {
        message.error(res.message);
      }
    } finally {
      setIsResending(false);
    }
  };

  const handleGoToLogin = () => {
    onClose();
    router.replace('/auth/login');
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      {isSuccess ? (
        <div className='text-center space-y-4 py-4'>
          <Image src={OwlSuccess} width={120} alt='success' className='mx-auto' />
          <h2 className='text-xl font-semibold'>Akun Berhasil Dibuat</h2>
          <p className='text-gray-500 text-sm'>Masuk ke dalam akun kamu untuk melanjutkan</p>
          <Button
            size='large'
            type='primary'
            className='w-full bg-gradient-to-r from-Kzen-secondary to-Kzen-primary rounded-full'
            onClick={handleGoToLogin}
          >
            Masuk Akun K-Zen
          </Button>
        </div>
      ) : (
        <div className='text-center space-y-4 py-4'>
          <Image src={Logo} width={150} alt='Logo' className='mx-auto' />
          <h2 className='text-xl font-semibold'>Masukkan Kode Verifikasi</h2>

          <div className='flex justify-center gap-2'>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type='text'
                inputMode='numeric'
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(e.target.value, index)}
                onKeyDown={(e) => handleKeyDown(e, index)}
                className='w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-kzen-primary'
              />
            ))}
          </div>

          <p className='text-gray-500 text-sm'>Kode Verifikasi Telah dikirim ke email</p>
          <p className='text-kzen-primary font-medium'>{maskedEmail}</p>

          <p className='text-gray-400 text-sm'>
            Tidak menerima kode?{' '}
            {countdown > 0 ? (
              <span className='text-kzen-primary font-medium'>{countdown}s</span>
            ) : (
              <button
                onClick={handleResend}
                disabled={isResending}
                className='text-kzen-primary font-medium hover:underline disabled:opacity-50'
              >
                {isResending ? 'Mengirim...' : 'Kirim Ulang'}
              </button>
            )}
          </p>

          <Button
            size='large'
            type='primary'
            className='w-full rounded-full'
            loading={isPending}
            onClick={handleSubmit}
            disabled={otp.join('').length < 6}
          >
            Verifikasi
          </Button>
        </div>
      )}
    </Modal>
  );
}