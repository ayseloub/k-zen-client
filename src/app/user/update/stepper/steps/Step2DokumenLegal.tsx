'use client'

import { Button } from 'antd';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { IUpdateProfilePayload } from '@/shared/models/interface/authinterfaces';

interface IStep2 {
  defaultValues: Partial<IUpdateProfilePayload>;
  onNext: (data: Partial<IUpdateProfilePayload>) => void;
  onBack: () => void;
}

interface IDocField {
  key: keyof IUpdateProfilePayload;
  label: string;
}

const DOC_FIELDS: IDocField[] = [
  { key: 'ktp', label: 'Kartu Tanda Penduduk (KTP)' },
  { key: 'kk', label: 'Kartu Keluarga' },
  { key: 'akta_kelahiran', label: 'Akta Kelahiran' },
];

export default function Step2DokumenLegal({ defaultValues, onNext, onBack }: IStep2) {
  const [files, setFiles] = useState<Record<string, File | null>>({
    ktp: (defaultValues.ktp as File) ?? null,
    kk: (defaultValues.kk as File) ?? null,
    akta_kelahiran: (defaultValues.akta_kelahiran as File) ?? null,
  });
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleFileChange = (key: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFiles((prev) => ({ ...prev, [key]: file }));
  };

  const handleNext = () => {
    onNext({
      ktp: files.ktp,
      kk: files.kk,
      akta_kelahiran: files.akta_kelahiran,
    });
  };

  return (
    <div>
      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>Verifikasi Identitasmu</h1>
        <p className='text-gray-500 mt-1'>Lengkapi dokumen identitas resmi untuk proses verifikasi.</p>
      </div>

      <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
        <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
          <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
          <span className='text-white font-medium'>Dokumen</span>
        </div>

        <div className='p-6 flex flex-col gap-4'>
          {DOC_FIELDS.map((doc) => (
            <div key={doc.key}>
              <p className='text-sm font-medium mb-2'>{doc.label}</p>
              {files[doc.key] ? (
                <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
                  <div className='flex items-center gap-2 text-gray-700'>
                    <Icon icon="basil:document-outline" width="20" className='text-Kzen-primary' />
                    <span className='text-sm'>{(files[doc.key] as File).name}</span>
                  </div>
                  <button
                    onClick={() => setFiles((prev) => ({ ...prev, [doc.key]: null }))}
                    className='text-red-400 hover:opacity-70'
                  >
                    <Icon icon="basil:trash-outline" width="20" />
                  </button>
                </div>
              ) : (
                <button
                  onClick={() => inputRefs.current[doc.key]?.click()}
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
                ref={(el) => { inputRefs.current[doc.key] = el; }}
                onChange={(e) => handleFileChange(doc.key, e)}
              />
            </div>
          ))}
        </div>

        <div className='flex justify-between px-6 pb-6'>
          <Button type='link' className='text-Kzen-primary' onClick={onBack}>Kembali</Button>
          <Button type='primary' className='rounded-full px-8 bg-Kzen-primary' onClick={handleNext}>
            Kirim dan Lanjut
          </Button>
        </div>
      </div>
    </div>
  );
}