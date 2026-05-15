'use client'

import { Button } from 'antd';
import { useRef, useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import OwlSuccess from '@/shared/assets/images/Owl;.png';

interface IStep5 {
  onSubmit: (data: any) => void;
  onBack: () => void;
  isPending: boolean;
}

const TEMPLATE_LINKS = {
  komitmen: 'https://docs.google.com/your-template-komitmen',
  cpmi: 'https://docs.google.com/your-template-cpmi',
  kuasa: 'https://docs.google.com/your-template-kuasa',
};

export default function Step5Persetujuan({ onSubmit, onBack, isPending }: IStep5) {
  const [docKomitmen, setDocKomitmen] = useState<File | null>(null);
  const [docCpmi, setDocCpmi] = useState<File | null>(null);
  const [docKuasa, setDocKuasa] = useState<File | null>(null);
  const komitmenRef = useRef<HTMLInputElement>(null);
  const cpmiRef = useRef<HTMLInputElement>(null);
  const kuasaRef = useRef<HTMLInputElement>(null);

  const handleSubmit = () => {
    onSubmit({
      document_komitmen: docKomitmen,
      document_komitmen_cpmi: docCpmi,
      document_pernyataan_kuasa: docKuasa,
    });
  };

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
      <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
        <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
        <span className='text-white font-medium'>Komitmen</span>
      </div>

      <div className='p-6'>
        <div className='text-center mb-6'>
          <Image src={OwlSuccess} alt='owl' width={100} className='mx-auto mb-3' />
          <h2 className='text-lg font-semibold mb-1'>Yeay, pendaftaran kamu hampir selesai!</h2>
          <p className='text-sm text-gray-500'>
            Tinggal satu langkah lagi nih, silakan unduh dan tandatangani Surat Pernyataan di bawah ini sebelum menyerahkan pendaftaran.
          </p>
        </div>

        <div className='mb-4'>
          <p className='text-sm font-medium mb-1'>Unduh Template Dokumen</p>
          <div className='flex gap-3'>
            <a href={TEMPLATE_LINKS.komitmen} target='_blank' rel='noopener noreferrer'
              className='text-Kzen-primary text-sm underline hover:opacity-70'>
              Surat Komitmen
            </a>
            <a href={TEMPLATE_LINKS.cpmi} target='_blank' rel='noopener noreferrer'
              className='text-Kzen-primary text-sm underline hover:opacity-70'>
              Surat CPMI
            </a>
            <a href={TEMPLATE_LINKS.kuasa} target='_blank' rel='noopener noreferrer'
              className='text-Kzen-primary text-sm underline hover:opacity-70'>
              Surat Kuasa
            </a>
          </div>
        </div>

        <div className='space-y-4'>
          <FileUpload label='Surat Pernyataan Komitmen Pendaftaran' file={docKomitmen}
            onSelect={setDocKomitmen} onRemove={() => setDocKomitmen(null)} inputRef={komitmenRef}
          />
          <FileUpload label='Surat Komitmen CPMI' file={docCpmi}
            onSelect={setDocCpmi} onRemove={() => setDocCpmi(null)} inputRef={cpmiRef}
          />
          <FileUpload label='Surat Pernyataan Kuasa' file={docKuasa}
            onSelect={setDocKuasa} onRemove={() => setDocKuasa(null)} inputRef={kuasaRef}
          />
        </div>

        <div className='flex justify-between mt-8'>
          <Button type='link' className='text-Kzen-primary' onClick={onBack}>Kembali</Button>
          <Button type='primary' onClick={handleSubmit} loading={isPending}
            className='rounded-full px-8 bg-gradient-to-r from-Kzen-secondary to-Kzen-primary'
          >
            Kirim dan Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
}

function FileUpload({ label, file, onSelect, onRemove, inputRef }: {
  label: string;
  file: File | null;
  onSelect: (file: File) => void;
  onRemove: () => void;
  inputRef: React.RefObject<HTMLInputElement | null>;
}) {
  return (
    <div>
      <p className='text-sm font-medium mb-2'>{label}</p>
      {file ? (
        <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
          <div className='flex items-center gap-2 text-gray-700'>
            <Icon icon="basil:document-outline" width="18" className='text-Kzen-primary' />
            <span className='text-sm'>{file.name}</span>
          </div>
          <button onClick={onRemove} className='text-red-400 hover:opacity-70'>
            <Icon icon="basil:trash-outline" width="18" />
          </button>
        </div>
      ) : (
        <button onClick={() => inputRef.current?.click()}
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
      <input ref={inputRef} type='file' accept='.pdf,.jpg,.jpeg,.png' className='hidden'
        onChange={(e) => { const f = e.target.files?.[0]; if (f) onSelect(f); }}
      />
    </div>
  );
}