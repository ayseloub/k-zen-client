'use client'

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { type FormInstance, message } from 'antd';
import { login } from '@/shared/actions/authService';
import { ILoginPayloadRoot } from '@/shared/models/interface/authinterfaces';

export const useHandleLoginMutate = (form: FormInstance) => {
  const router = useRouter();
  const [isPending, setIsPending] = useState(false);

  const handleMutate = async () => {
    setIsPending(true);
    try {
      const loginPayload: ILoginPayloadRoot = {
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
      };

      const res = await login(loginPayload);

      if (res.success) {
        message.success(res.message);
        const params = new URLSearchParams(window.location.search);
        const redirect = params.get('redirect') ?? '/user/dashboard';
        router.replace(redirect);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Terjadi kesalahan saat login');
    } finally {
      setIsPending(false);
    }
  };

  return { handleMutate, isPending };
};