'use client'

import { Button, Form, type FormInstance, Input } from 'antd';
import { useState } from 'react';
import ForgotPasswordModal from '../modal/ForgotPasswordModal';

interface ILoginForm {
  form: FormInstance;
  handleMutate: () => void;
  isLoading: boolean;
}

export default function LoginForm({ form, handleMutate, isLoading }: ILoginForm) {
  const [showForgotPassword, setShowForgotPassword] = useState(false);

  return (
    <>
      <Form
        form={form}
        onFinish={handleMutate}
        layout="vertical"
        className="w-full space-y-4 text-right"
      >
        <Form.Item
          rules={[{ required: true, message: 'Masukkan email kamu!' }]}
          className="my-0"
          required
          name="email"
          label="Email"
        >
          <Input placeholder="Email" className='rounded-full' />
        </Form.Item>

        <Form.Item
          rules={[{ required: true, message: 'Masukkan password kamu!' }]}
          className="my-0"
          required
          name="password"
          label="Password"
        >
          <Input.Password placeholder="Password" className='rounded-full' />
        </Form.Item>

        <button
          type='button'
          onClick={() => setShowForgotPassword(true)}
          className="block mt-2 text-Kzen-primary hover:text-Kzen-secondary text-sm justify-end"
        >
          Lupa Password?
        </button>

        <Button
          size="large"
          className="mt-2 h-[36px] w-full rounded-full bg-gradient-to-r from-Kzen-secondary to-Kzen-primary"
          type="primary"
          htmlType="submit"
          loading={isLoading}
        >
          Masuk
        </Button>
      </Form>

      <ForgotPasswordModal
        open={showForgotPassword}
        onClose={() => setShowForgotPassword(false)}
      />
    </>
  );
}