'use client'

import { Button, Form, Input, Select } from 'antd';
import { useForm } from 'antd/es/form/Form';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { IUpdateProfilePayload } from '@/shared/models/interface/authinterfaces';

interface IStep3 {
  defaultValues: Partial<IUpdateProfilePayload>;
  onSubmit: (data: Partial<IUpdateProfilePayload>) => void;
  onBack: () => void;
  isPending: boolean;
}

const EDUCATION_OPTIONS = [
  'SMA/SMK/SLTA/Sederajat',
  'Diploma 1/Sederajat',
  'Diploma 2/Sederajat',
  'Diploma 3/Sederajat',
  'Sarjana/Diploma 4/Sederajat',
  'Magister/Sederajat',
  'Doktoral/Sederajat',
];

export default function Step3PendidikanTerakhir({ defaultValues, onSubmit, onBack, isPending }: IStep3) {
  const [form] = useForm();
  const [ijazah, setIjazah] = useState<File | null>((defaultValues.ijazah as File) ?? null);
  const ijazahRef = useRef<HTMLInputElement>(null);

  const initialValues = {
    last_education: defaultValues.last_education ?? undefined,
    major: defaultValues.major ?? undefined,
  };

  const handleFinish = (values: any) => {
    onSubmit({ ...values, ijazah });
  };

  return (
    <div>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>
          Verifikasi <span className='text-Kzen-primary'>Pendidikan Terakhir</span>
        </h1>
        <p className='text-gray-500 mt-1'>Unggah dokumen pendidikan terakhir dan buka lebih banyak peluang</p>
      </div>

      <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
        <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
          <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
          <span className='text-white font-medium'>Pendidikan Terakhir</span>
        </div>

        <div className='p-6'>
          <Form form={form} onFinish={handleFinish} layout='vertical' initialValues={initialValues}>
            <Form.Item name='last_education' label='Pendidikan Terakhir'>
              <Select placeholder='Pendidikan Terakhir' className='rounded-full'>
                {EDUCATION_OPTIONS.map((opt) => (
                  <Select.Option key={opt} value={opt}>{opt}</Select.Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item name='major' label='Program Studi'>
              <Input placeholder='Program Studi' className='rounded-full' />
            </Form.Item>

            <Form.Item label='Ijazah Terakhir'>
              {ijazah ? (
                <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
                  <div className='flex items-center gap-2 text-gray-700'>
                    <Icon icon="basil:document-outline" width="20" className='text-Kzen-primary' />
                    <span className='text-sm'>{ijazah.name}</span>
                  </div>
                  <button onClick={() => setIjazah(null)} className='text-red-400 hover:opacity-70'>
                    <Icon icon="basil:trash-outline" width="20" />
                  </button>
                </div>
              ) : (
                <button
                  type='button'
                  onClick={() => ijazahRef.current?.click()}
                  className='w-full border border-gray-200 rounded-xl py-4 flex flex-col items-center gap-1 hover:border-Kzen-primary hover:text-Kzen-primary transition-colors text-gray-400'
                >
                  <Icon icon="basil:upload-outline" width="24" />
                  <span className='text-sm'>Upload</span>
                </button>
              )}
              <div className='flex justify-between mt-1'>
                <span className='text-xs text-gray-400'>File yang didukung: pdf, jpg, png, jpeg</span>
                <span className='text-xs text-gray-400'>Max: 5MB</span>
              </div>
              <input
                type='file'
                accept='.pdf,.jpg,.jpeg,.png'
                className='hidden'
                ref={ijazahRef}
                 style={{ display: 'none' }}
                onChange={(e) => setIjazah(e.target.files?.[0] ?? null)}
              />
            </Form.Item>

            <div className='flex justify-between mt-4'>
              <Button type='link' className='text-Kzen-primary' onClick={onBack}>Kembali</Button>
              <Button
                type='primary'
                htmlType='submit'
                className='rounded-full px-8 bg-Kzen-primary'
                loading={isPending}
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