'use client'

import React, { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import { getUserProfile } from '@/shared/actions/authService';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';
import { useRouter } from 'next/navigation';


interface IInfoRow {
  label: string;
  value: string | null;
  editable?: boolean;
  onEdit?: () => void;
}

function InfoRow({ label, value, editable, onEdit }: IInfoRow) {
  return (
    <div className='flex items-center py-3 last:border-0'>
      <span className='w-48 text-gray-500 font-light'>{label}</span>
      <span className='flex-1 text-gray-800'>{value ?? '-'}</span>
      {editable && (
        <button className='text-Kzen-primary hover:opacity-70' onClick={onEdit}>
          <Icon icon="mynaui:edit" width="20" height="20" />
        </button>
      )}
    </div>
  );
}

function getGenderLabel(gender: string | number | null | undefined): string | null {
  if (gender === null || gender === undefined) return null;
  return String(gender) === '0' ? 'Laki-laki' : 'Perempuan';
}

export default function PersonalInfoContainer() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const router = useRouter();

  useEffect(() => {
    getUserProfile().then(setUser);
  }, []);

  return (
    <div className='flex flex-col gap-4'>
      <div className='bg-white border-2 border-Kzen-neutral/30 rounded-2xl p-6'>
        <div className='flex items-center justify-between mb-4'>
          <h2 className='text-lg font-semibold'>Biodata Diri</h2>
          <button className='text-Kzen-primary hover:opacity-70' onClick={() => router.push('/user/update/edit')}>
            <Icon icon="mynaui:edit" width="22" height="22" />
          </button>
        </div>

        <div className='w-full border-t-[1px] border-Kzen-neutral'></div>

        <InfoRow label='Nama Lengkap' value={user?.fullname ?? null} />
        <InfoRow label='NIK' value={user?.nik ?? null} />
        <InfoRow label='Tanggal Lahir' value={user?.date_of_birth ?? null} />
        <InfoRow label='Jenis Kelamin' value={getGenderLabel(user?.gender)} />
        <InfoRow label='Alamat Lengkap' value={user?.address ?? null} />
        <InfoRow label='Alamat Domisili' value={user?.domicile_address ?? null} />
      </div>

      <div className='bg-white border-2 border-Kzen-neutral/30 rounded-2xl p-6'>
        <h2 className='text-lg font-semibold mb-4'>Kontak</h2>
        <InfoRow label='Email' value={user?.email ?? null} editable onEdit={() => router.push('/user/update/edit')} />
        <InfoRow label='No Telp' value={user?.phone ?? null} editable onEdit={() => router.push('/user/update/edit')} />
      </div>
    </div>
  );
}