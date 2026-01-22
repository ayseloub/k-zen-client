'use client';

import { ContactList } from '@/shared/models/static/ContactList';
import { Icon } from '@iconify/react';
import React, { useState } from 'react';
import { Form, message } from 'antd';
import ContactForm from '../assets/ContactForm';

export default function HomeComponents9() {
  const [form] = Form.useForm();
  const [isLoading, setIsLoading] = useState(false);

  const handleMutate = async (values: any) => {
    setIsLoading(true);
    
    try {
      console.log('Form values:', values);
      
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      message.success('Pesan berhasil dikirim!');
      form.resetFields();
    } catch (error) {
      message.error('Gagal mengirim pesan!');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='py-20 px-36'>
      <div className='rounded-2xl p-12 bg-white'>
        <section className='flex justify-between items-center mb-12'>
          <div className='text-4xl font-semibold'>
            <h1 className='text-Kzen-primary'>Butuh bantuan?</h1>
            <h1>Kami Disini Untuk Kamu</h1>
          </div>
          <div className='flex gap-4 items-center'>
            {ContactList.map((contact, index) => (
              <a 
                key={index}
                href={contact.href}
                target="_blank"
                rel="noopener noreferrer"
                className='hover:opacity-80 transition-opacity bg-gray-100 rounded-full p-4'
              >
                <Icon 
                  icon={contact.icon} 
                  width={32} 
                  height={32} 
                  className='text-gray-700' 
                />
              </a>
            ))}
          </div>
        </section>

        <section>
          <ContactForm 
            form={form}
            handleMutate={handleMutate}
            isLoading={isLoading}
          />
        </section>
      </div>
    </div>
  );
}