'use client'

import { Button } from 'antd';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';

interface IStep1 {
  user: IUserProfile | null;
  onNext: () => void;
}

function getGenderLabel(gender: string | number | null | undefined): string {
  if (gender === null || gender === undefined) return '-';
  return String(gender) === '0' ? 'Laki-laki' : 'Perempuan';
}

export default function Step1PersonalInfo({ user, onNext }: IStep1) {
  return (
    <div className='bg-white rounded-2xl overflow-hidden shadow-sm'>
      <div className='bg-Kzen-primary px-6 py-3 flex items-center justify-between'>
        <Image src={Logo} alt='Logo' width={80} className='brightness-0 invert' />
        <span className='text-white font-medium'>Profil Peserta</span>
      </div>

      <div className='p-6'>
        <p className='text-Kzen-primary font-semibold mb-4'>Halo, KZeners</p>

        <div className='grid grid-cols-2 gap-x-8 gap-y-3'>
          <InfoRow label='Nama Lengkap' value={user?.fullname} />
          <InfoRow label='No Telp' value={user?.phone} />
          <InfoRow label='NIK' value={user?.nik} />
          <InfoRow label='Tanggal Lahir' value={user?.date_of_birth} />
        </div>

        <div className='mt-3'>
          <InfoRow label='Jenis Kelamin' value={getGenderLabel(user?.gender)} />
        </div>

        <div className='grid grid-cols-2 gap-x-8 gap-y-3 mt-3'>
          <InfoRow label='Alamat Lengkap' value={user?.address} />
          <InfoRow label='Alamat Domisili' value={user?.domicile_address} />
        </div>

        <div className='flex justify-between mt-8'>
          <span />
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

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div>
      <p className='text-sm text-gray-500 mb-1'>{label}</p>
      <div className='border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 bg-gray-50'>
        {value ?? '-'}
      </div>
    </div>
  );
}