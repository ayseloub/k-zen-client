'use client'

import { useState } from 'react';
import { type FormInstance, message } from 'antd';
import { register } from '@/shared/actions/authService';
import { IRegisterPayloadRoot } from '@/shared/models/interface/authinterfaces';

export const useHandleRegisterMutate = (
  form: FormInstance,
  onSuccess: (email: string) => void
) => {
  const [isPending, setIsPending] = useState(false);

  const handleMutate = async () => {
    setIsPending(true);
    try {
      const payload: IRegisterPayloadRoot = {
        name: form.getFieldValue('name'),
        email: form.getFieldValue('email'),
        password: form.getFieldValue('password'),
        password_confirmation: form.getFieldValue('password_confirmation'),
      };

      const res = await register(payload);

      if (res.success) {
        message.success(res.message);
        onSuccess(payload.email);
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error(error instanceof Error ? error.message : 'Terjadi kesalahan saat registrasi');
    } finally {
      setIsPending(false);
    }
  };

  return { handleMutate, isPending };
};