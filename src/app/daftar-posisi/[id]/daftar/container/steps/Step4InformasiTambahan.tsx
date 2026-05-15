'use client'

import { Button, Checkbox } from 'antd';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';

interface IStep4 {
  onNext: (data: any) => void;
  onBack: () => void;
}

const PERNYATAAN = [
  'Saya menyatakan tidak laki-laki, tindik, dan tidak sedang maupun pernah mengalami patah tulang.',
  'Saya tidak memiliki nasyit panjat degeneratif.',
  'Saya bersedia mengikuti seluruh rangkaian kegiatan pelatihan sesuai dengan ketentuan yang berlaku.',
];

export default function Step4InformasiTambahan({ onNext, onBack }: IStep4) {
  const [tinggi, setTinggi] = useState('');
  const [docKesehatan, setDocKesehatan] = useState<File | null>(null);
  const [checkedPernyataan, setCheckedPernyataan] = useState<boolean[]>(PERNYATAAN.map(() => false));
  const kesehatanRef = useRef<HTMLInputElement>(null);

  const allChecked = checkedPernyataan.every(Boolean);

  const handleSubmit = () => {
    onNext({
      tinggi_badan: tinggi,
      document_kesehatan: docKesehatan,
    });
  };

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
      <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
        <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
        <span className='text-white font-medium'>Informasi Tambahan</span>
      </div>

      <div className='p-6 space-y-4'>
        <div>
          <p className='text-sm font-medium mb-2'>Tinggi Badan</p>
          <input
            type='number'
            placeholder='cm'
            value={tinggi}
            onChange={(e) => setTinggi(e.target.value)}
            className='w-full border border-gray-200 rounded-lg px-3 py-2 text-sm'
          />
        </div>

        <div>
          <p className='text-sm font-medium mb-2'>Surat Keterangan Sehat</p>
          {docKesehatan ? (
            <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
              <div className='flex items-center gap-2 text-gray-700'>
                <Icon icon="basil:document-outline" width="18" className='text-Kzen-primary' />
                <span className='text-sm'>{docKesehatan.name}</span>
              </div>
              <button onClick={() => { setDocKesehatan(null); if (kesehatanRef.current) kesehatanRef.current.value = ''; }}
                className='text-red-400 hover:opacity-70'
              >
                <Icon icon="basil:trash-outline" width="18" />
              </button>
            </div>
          ) : (
            <button onClick={() => kesehatanRef.current?.click()}
              className='w-full border border-gray-200 rounded-xl py-3 flex flex-col items-center gap-1 hover:border-Kzen-primary hover:text-Kzen-primary transition-colors text-gray-400'
            >
              <Icon icon="basil:upload-outline" width="22" />
              <span className='text-sm'>Upload</span>
            </button>
          )}
          <div className='flex justify-between mt-1'>
            <span className='text-xs text-gray-400'>File: pdf, jpg, png, jpeg</span>
            <span className='text-xs text-gray-400'>Max: 5MB</span>
          </div>
          <input ref={kesehatanRef} type='file' accept='.pdf,.jpg,.jpeg,.png' className='hidden'
            onChange={(e) => setDocKesehatan(e.target.files?.[0] ?? null)}
          />
        </div>

        <div className='border-t border-gray-200 pt-4'>
          <p className='text-sm font-medium mb-3'>Pernyataan</p>
          {PERNYATAAN.map((text, i) => (
            <label key={i} className='flex items-start gap-2 mb-3 cursor-pointer'>
              <Checkbox
                checked={checkedPernyataan[i]}
                onChange={(e) => {
                  const updated = [...checkedPernyataan];
                  updated[i] = e.target.checked;
                  setCheckedPernyataan(updated);
                }}
              />
              <span className='text-sm text-gray-600'>{text}</span>
            </label>
          ))}
        </div>

        <div className='flex justify-between pt-4'>
          <Button type='link' className='text-Kzen-primary' onClick={onBack}>Kembali</Button>
          <Button type='primary' onClick={handleSubmit} disabled={!allChecked}
            className='rounded-full px-8 bg-gradient-to-r from-Kzen-secondary to-Kzen-primary disabled:opacity-40'
          >
            Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
}