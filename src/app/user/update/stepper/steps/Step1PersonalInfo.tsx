'use client'

import { Button, DatePicker, Form, Input, Radio } from 'antd';
import { useForm } from 'antd/es/form/Form';
import Image from 'next/image';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Logo from '@/shared/assets/images/logo.svg';
import { IUpdateProfilePayload } from '@/shared/models/interface/authinterfaces';
import dayjs from 'dayjs';

interface IStep1 {
  defaultValues: Partial<IUpdateProfilePayload>;
  onNext: (data: Partial<IUpdateProfilePayload>) => void;
}

export default function Step1PersonalInfo({ defaultValues, onNext }: IStep1) {
  const [form] = useForm();
  const [avatar, setAvatar] = useState<File | null>(defaultValues.avatar ?? null);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [sameAddress, setSameAddress] = useState(false);
  const avatarRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    ...defaultValues,
    date_of_birth: defaultValues.date_of_birth
      ? dayjs(defaultValues.date_of_birth)
      : undefined,
  };

  const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    if (!file) return;
    setAvatar(file);
    setAvatarPreview(URL.createObjectURL(file));
  };

  const handleRemoveAvatar = () => {
    setAvatar(null);
    setAvatarPreview(null);
    if (avatarRef.current) avatarRef.current.value = '';
  };

  const handleSameAddress = (checked: boolean) => {
    setSameAddress(checked);
    if (checked) {
      const address = form.getFieldValue('address');
      form.setFieldValue('domicile_address', address);
    } else {
      form.setFieldValue('domicile_address', '');
    }
  };

  const handleFinish = (values: any) => {
    console.log('date_of_birth raw:', values.date_of_birth);
    console.log('date_of_birth formatted:', values.date_of_birth?.format('YYYY-MM-DD'));

    onNext({
      ...values,
      avatar,
      date_of_birth: values.date_of_birth?.format('YYYY-MM-DD'),
    });
  };

  return (
    <div>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>
          <span className='text-Kzen-primary'>Lengkapi Profilmu,</span> Buka Lebih Banyak Peluang
        </h1>
        <p className='text-gray-500 mt-1'>
          Lengkapi informasi dirimu dan dapatkan lebih banyak peluang karier
        </p>
      </div>

      <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
        <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
          <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
          <span className='text-white font-medium'>Profil Peserta</span>
        </div>

        <div className='p-6'>
          <Form form={form} onFinish={handleFinish} layout='vertical' initialValues={initialValues}>
            <div className='flex gap-6'>
              <div className='flex flex-col items-center gap-2'>
                <div
                  onClick={() => avatarRef.current?.click()}
                  className='w-28 h-36 rounded-xl border-2 border-dashed border-gray-300 flex items-center justify-center cursor-pointer hover:border-Kzen-primary overflow-hidden relative'
                >
                  {avatarPreview ? (
                    <>
                      <img src={avatarPreview} alt='avatar' className='w-full h-full object-cover' />
                      <button
                        type='button'
                        onClick={(e) => { e.stopPropagation(); handleRemoveAvatar(); }}
                        className='absolute top-1 right-1 bg-red-500 rounded-full p-0.5'
                      >
                        <Icon icon="basil:close-outline" width="12" className='text-white' />
                      </button>
                    </>
                  ) : (
                    <Icon icon="basil:add-outline" width="32" height="32" className='text-gray-400' />
                  )}
                </div>
                <p className='text-xs text-gray-400 text-center'>
                  Background Merah,<br />Max. 5MB
                </p>
                <input
                  ref={avatarRef}
                  type='file'
                  accept='image/*'
                  style={{ display: 'none' }}
                  onChange={handleAvatarChange}
                />
              </div>

              <div className='flex-1'>
                <p className='text-Kzen-primary font-semibold mb-4'>Halo, KZeners</p>
                <div className='grid grid-cols-2 gap-4'>
                  <Form.Item name='fullname' label='Nama Lengkap' required>
                    <Input placeholder='Nama Lengkap' className='rounded-full' />
                  </Form.Item>
                  <Form.Item name='phone' label='No Telp' required>
                    <Input placeholder='No Telp' className='rounded-full' type='tel' />
                  </Form.Item>
                  <Form.Item name='nik' label='NIK' required>
                    <Input placeholder='NIK' className='rounded-full' />
                  </Form.Item>
                  <Form.Item name='date_of_birth' label='Tanggal Lahir' required>
                    <DatePicker
                      placeholder='Tanggal Lahir'
                      className='rounded-full w-full'
                      format='YYYY-MM-DD'
                    />
                  </Form.Item>
                </div>

                <Form.Item name='gender' label='Jenis Kelamin' required>
                  <Radio.Group>
                    <Radio value='0'>Laki-laki</Radio>
                    <Radio value='1'>Perempuan</Radio>
                  </Radio.Group>
                </Form.Item>

                <div className='grid grid-cols-2 gap-4'>
                  <Form.Item name='address' label='Alamat Lengkap' required>
                    <Input
                      placeholder='Alamat Lengkap'
                      className='rounded-full'
                      onChange={(e) => {
                        if (sameAddress) {
                          form.setFieldValue('domicile_address', e.target.value);
                        }
                      }}
                    />
                  </Form.Item>
                  <div>
                    <Form.Item name='domicile_address' label='Alamat Domisili' required>
                      <Input
                        placeholder='Alamat Domisili'
                        className='rounded-full'
                        disabled={sameAddress}
                      />
                    </Form.Item>
                    <label className='flex items-center gap-2 text-sm text-gray-500 -mt-2 cursor-pointer'>
                      <input
                        type='checkbox'
                        checked={sameAddress}
                        onChange={(e) => handleSameAddress(e.target.checked)}
                        className='accent-Kzen-primary'
                      />
                      Sama dengan KTP
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between mt-6'>
              <Button type='link' className='text-Kzen-primary'>Kembali</Button>
              <Button
                type='primary'
                htmlType='submit'
                className='rounded-full px-8 bg-Kzen-primary'
              >
                Kirim dan Lanjut
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}