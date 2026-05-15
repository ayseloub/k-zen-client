'use client'

import { Button } from 'antd';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { getUserDocuments, IDocument } from '@/shared/actions/userService';

interface IStep2 {
  onNext: () => void;
  onBack: () => void;
}

export default function Step2DokumenLegal({ onNext, onBack }: IStep2) {
  const [documents, setDocuments] = useState<IDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserDocuments()
      .then(setDocuments)
      .finally(() => setIsLoading(false));
  }, []);

  const legalDocs = documents.filter(
    (doc) => doc.type === 'KTP' || doc.type === 'Kartu Keluarga' || doc.type === 'Akta Kelahiran'
  );

  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
      <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
        <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
        <span className='text-white font-medium'>Dokumen</span>
      </div>

      <div className='p-6'>
        {isLoading ? (
          <div className='text-center py-8 text-gray-400'>Memuat dokumen...</div>
        ) : legalDocs.length === 0 ? (
          <div className='text-center py-8 text-gray-400'>Belum ada dokumen. Lengkapi di halaman profil.</div>
        ) : (
          <div className='space-y-4'>
            {legalDocs.map((doc) => (
              <div key={doc.id}>
                <p className='text-sm font-medium mb-2'>{doc.type}</p>
                <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
                  <div className='flex items-center gap-2 text-gray-700'>
                    <Icon icon="basil:document-outline" width="18" className='text-Kzen-primary' />
                    <span className='text-sm'>{doc.type}.pdf</span>
                  </div>
                  <Icon icon="basil:check-outline" width="18" className='text-green-500' />
                </div>
              </div>
            ))}
          </div>
        )}

        <div className='flex justify-between mt-8'>
          <Button type='link' className='text-Kzen-primary' onClick={onBack}>Kembali</Button>
          <Button type='primary' onClick={onNext}
            className='rounded-full px-8 bg-gradient-to-r from-Kzen-secondary to-Kzen-primary'
          >
            Lanjutkan
          </Button>
        </div>
      </div>
    </div>
  );
}