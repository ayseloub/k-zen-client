'use client'

import { Button, Form, Input, Modal, message } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import React, { useEffect, useRef, useState } from 'react';
import Logo from '@/shared/assets/images/logo.svg';
import OwlSuccess from '@/shared/assets/images/Owl;.png';
import { forgotPassword, resetPassword } from '@/shared/actions/authService';

interface IForgotPasswordModal {
  open: boolean;
  onClose: () => void;
}

type Step = 'email' | 'otp' | 'reset' | 'success';

export default function ForgotPasswordModal({ open, onClose }: IForgotPasswordModal) {
  const [step, setStep] = useState<Step>('email');
  const [email, setEmail] = useState('');
  const [otpCode, setOtpCode] = useState('');
  const [otp, setOtp] = useState<string[]>(Array(6).fill(''));
  const [countdown, setCountdown] = useState(60);
  const [isPending, setIsPending] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [emailForm] = useForm();
  const [resetForm] = useForm();

  useEffect(() => {
    if (!open) return;
    setStep('email');
    setOtp(Array(6).fill(''));
    setOtpCode('');
    setCountdown(60);
    emailForm.resetFields();
    resetForm.resetFields();
  }, [open]);

  useEffect(() => {
    if (step !== 'otp') return;
    setCountdown(60);
  }, [step]);

  useEffect(() => {
    if (countdown <= 0) return;
    const timer = setTimeout(() => setCountdown((prev) => prev - 1), 1000);
    return () => clearTimeout(timer);
  }, [countdown]);

  const handleOtpChange = (value: string, index: number) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value.slice(-1);
    setOtp(newOtp);
    if (value && index < 5) inputRefs.current[index + 1]?.focus();
  };

  const handleOtpKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleEmailSubmit = async (values: { email: string }) => {
    setIsPending(true);
    try {
      const res = await forgotPassword({ email: values.email });
      if (res.success) {
        message.success(res.message);
        setEmail(values.email);
        setStep('otp');
      } else {
        message.error(res.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  const handleOtpSubmit = () => {
    const code = otp.join('');
    if (code.length < 6) return;
    setOtpCode(code);
    setStep('reset');
  };

  const handleResend = async () => {
    setIsResending(true);
    try {
      const res = await forgotPassword({ email });
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

  const handleResetSubmit = async (values: { password: string }) => {
    setIsPending(true);
    try {
      const res = await resetPassword({
        email,
        password: values.password,
        otp: otpCode,
      });
      if (res.success) {
        message.success(res.message);
        setStep('success');
      } else {
        message.error(res.message);
      }
    } finally {
      setIsPending(false);
    }
  };

  const maskedEmail = email.replace(/(.{2})(.*)(@.*)/, '$1***$3');

  const renderStep = () => {
    switch (step) {
      case 'email':
        return (
          <div className='text-center space-y-4 py-4'>
            <Image src={Logo} width={150} alt='Logo' className='mx-auto' />
            <h2 className='text-xl font-semibold'>Lupa Password?</h2>
            <p className='text-gray-500 text-sm'>
              Masukkan email kamu untuk menerima kode verifikasi
            </p>
            <Form form={emailForm} onFinish={handleEmailSubmit} layout='vertical' className='text-left'>
              <Form.Item
                name='email'
                rules={[
                  { required: true, message: 'Masukkan email kamu!' },
                  { type: 'email', message: 'Format email tidak valid!' },
                ]}
              >
                <Input placeholder='Email' className='rounded-full' />
              </Form.Item>
              <Button
                size='large'
                type='primary'
                htmlType='submit'
                className='w-full rounded-full bg-gradient-to-r from-Kzen-secondary to-Kzen-primary'
                loading={isPending}
              >
                Kirim Kode Verifikasi
              </Button>
            </Form>
          </div>
        );

      case 'otp':
        return (
          <div className='text-center space-y-4 py-4'>
            <Image src={Logo} width={150} alt='Logo' className='mx-auto' />
            <h2 className='text-xl font-semibold'>Masukkan Kode Verifikasi</h2>
            <p className='text-gray-500 text-sm'>Kode verifikasi telah dikirim ke email</p>
            <p className='text-kzen-primary font-medium'>{maskedEmail}</p>

            <div className='flex justify-center gap-2'>
              {otp.map((digit, index) => (
                <input
                  key={index}
                  ref={(el) => { inputRefs.current[index] = el; }}
                  type='text'
                  inputMode='numeric'
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleOtpChange(e.target.value, index)}
                  onKeyDown={(e) => handleOtpKeyDown(e, index)}
                  className='w-12 h-12 text-center text-xl border border-gray-300 rounded-lg focus:outline-none focus:border-kzen-primary'
                />
              ))}
            </div>

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
              className='w-full rounded-full bg-gradient-to-r from-Kzen-secondary to-Kzen-primary'
              onClick={handleOtpSubmit}
              disabled={otp.join('').length < 6}
            >
              Verifikasi
            </Button>
          </div>
        );

      case 'reset':
        return (
          <div className='text-center space-y-4 py-4'>
            <Image src={Logo} width={150} alt='Logo' className='mx-auto' />
            <h2 className='text-xl font-semibold'>Buat Password Baru</h2>
            <p className='text-gray-500 text-sm'>Masukkan password baru kamu</p>
            <Form form={resetForm} onFinish={handleResetSubmit} layout='vertical' className='text-left'>
              <Form.Item
                name='password'
                rules={[{ required: true, message: 'Masukkan password baru!' }]}
              >
                <Input.Password placeholder='Password Baru' className='rounded-full' />
              </Form.Item>
              <Form.Item
                name='password_confirmation'
                rules={[
                  { required: true, message: 'Konfirmasi password!' },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('Password tidak sama!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder='Konfirmasi Password' className='rounded-full' />
              </Form.Item>
              <Button
                size='large'
                type='primary'
                htmlType='submit'
                className='w-full rounded-full bg-gradient-to-r from-Kzen-secondary to-Kzen-primary'
                loading={isPending}
              >
                Simpan Password
              </Button>
            </Form>
          </div>
        );

      case 'success':
        return (
          <div className='text-center space-y-4 py-4'>
            <Image src={OwlSuccess} width={120} alt='success' className='mx-auto' />
            <h2 className='text-xl font-semibold'>Password Berhasil Diubah</h2>
            <p className='text-gray-500 text-sm'>Silakan masuk dengan password baru kamu</p>
            <Button
              size='large'
              type='primary'
              className='w-full rounded-full'
              onClick={onClose}
            >
              Masuk Sekarang
            </Button>
          </div>
        );
    }
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      centered
      width={400}
    >
      {renderStep()}
    </Modal>
  );
}