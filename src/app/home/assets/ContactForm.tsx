'use client';

import { Button, Form, type FormInstance, Input } from 'antd';
import styles from './style.module.scss';

interface IContactForm {
  form: FormInstance<any>;
  handleMutate: (values: any) => void;
  isLoading: boolean;
}

export default function ContactForm({ form, handleMutate, isLoading }: IContactForm) {
  return (
    <Form
      form={form}
      onFinish={handleMutate}
      layout="vertical"
      className={styles.contactForm}
    >
      <div className="grid grid-cols-3 gap-6">
        <Form.Item
          rules={[{ required: true, message: 'Nama wajib diisi!' }]}
          name="name"
          label="Nama"
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          rules={[
            { required: true, message: 'Nomor telepon wajib diisi!' },
            { pattern: /^[0-9]+$/, message: 'Hanya boleh angka!' }
          ]}
          name="phone"
          label="Nomor Telepon"
        >
          <Input placeholder="" />
        </Form.Item>

        <Form.Item
          rules={[
            { type: 'email', message: 'Format email tidak valid!' }
          ]}
          name="email"
          label="Email (Opsional)"
        >
          <Input placeholder="" />
        </Form.Item>
      </div>

      <Form.Item
        rules={[{ required: true, message: 'Pesan wajib diisi!' }]}
        name="message"
        label="Pesan"
        className="mt-6"
      >
        <Input.TextArea 
          placeholder="" 
          rows={4}
        />
      </Form.Item>

      <Button
        size="large"
        className="mt-6 h-12 px-12 rounded-full bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-white font-semibold hover:opacity-90 transition-opacity"
        type="primary"
        htmlType="submit"
        loading={isLoading}
      >
        Kirimkan Pesan
      </Button>
    </Form>
  );
}