'use client'
import { Button, Form, type FormInstance, Input } from 'antd';

interface IRegisterForm {
  form: FormInstance;
  handleMutate: () => void;
  isLoading: boolean;
}

export default function RegisterForm({ form, handleMutate, isLoading }: IRegisterForm) {
  return (
    <Form
      form={form}
      onFinish={handleMutate}
      layout="vertical"
      className="w-full space-y-4 text-right"
    >
      <Form.Item
        rules={[{ required: true, message: 'Masukkan Nama Lengkap' }]}
        className="my-0"
        required
        name="name"
        label="Nama Lengkap"
      >
        <Input placeholder="Nama Lengkap" className='rounded-full' />
      </Form.Item>

      <Form.Item
        rules={[{ required: true, message: 'Masukkan email kamu!' }]}
        className="my-0"
        required
        name="email"
        label="Email"
      >
        <Input placeholder="Email" className='rounded-full' />
      </Form.Item>

      <div className='grid grid-cols-2 gap-4'>
        <Form.Item
          rules={[{ required: true, message: 'Masukkan password!' }]}
          className="my-0"
          required
          name="password"
          label="Password"
        >
          <Input.Password placeholder="Password" className='rounded-full' />
        </Form.Item>

        <Form.Item
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
          className="my-0"
          required
          name="password_confirmation"
          label="Konfirmasi Password"
        >
          <Input.Password placeholder="Konfirmasi Password" className='rounded-full' />
        </Form.Item>
      </div>

      <Button
        size="large"
        className="mt-2 h-[36px] w-full rounded-full bg-gradient-to-r from-Kzen-secondary to-Kzen-primary"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        Daftar
      </Button>
    </Form>
  );
}