'use client'

import { Button } from 'antd';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';

interface IStep3 {
  user: IUserProfile | null;
  onNext: () => void;
  onBack: () => void;
}

export default function Step3PendidikanTerakhir({ user, onNext, onBack }: IStep3) {
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
      <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
        <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
        <span className='text-white font-medium'>Pendidikan Terakhir</span>
      </div>

      <div className='p-6 space-y-4'>
        <div>
          <p className='text-sm text-gray-500 mb-1'>Pendidikan Terakhir</p>
          <div className='border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50'>
            {user?.last_education ?? '-'}
          </div>
        </div>

        <div>
          <p className='text-sm text-gray-500 mb-1'>Program Studi</p>
          <div className='border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50'>
            {user?.major ?? '-'}
          </div>
        </div>

        <div>
          <p className='text-sm text-gray-500 mb-1'>Ijazah Terakhir</p>
          <div className='border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50'>
            {user?.last_education ? 'Sudah diupload' : 'Belum diupload'}
          </div>
        </div>

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