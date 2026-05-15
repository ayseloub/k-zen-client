'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import { getUserProfile } from '@/shared/actions/authService';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';
import { getUserEnrollments } from '@/shared/actions/productService';
import { IUserEnrollment } from '@/shared/models/interface/productInterfaces';
import DashboardHero from '@/shared/assets/images/dashboard-hero.png';
import ComingSoonBanner from '@/shared/assets/images/coming-soon-banner.png';
import EmptyHeroBg from '@/shared/assets/images/empty-hero-bg.png';

const STEP_LABELS: Record<string, string> = {
  'PendaftaranProgram': 'Pendaftaran Program',
  'VerifikasiDokumen': 'Verifikasi Dokumen',
  'VerifikasiDokumenKarier': 'Verifikasi Dokumen',
  'Pembayaran': 'Pembayaran',
  'Pelatihan': 'Pelatihan',
  'VerifikasiDokumenPerusahaan': 'Verifikasi Dokumen Oleh Perusahaan',
  'Interview': 'Interview',
  'Offering': 'Offering',
  'Keberangkatan': 'Keberangkatan',
};

const NEXT_STEP_MAP: Record<string, string> = {
  'PendaftaranProgram': 'Verifikasi Dokumen',
  'VerifikasiDokumen': 'Pembayaran',
  'VerifikasiDokumenKarier': 'Pembayaran',
  'Pembayaran': 'Pelatihan',
  'Pelatihan': 'Verifikasi Dokumen Oleh Perusahaan',
  'VerifikasiDokumenPerusahaan': 'Interview',
  'Interview': 'Offering',
  'Offering': 'Keberangkatan',
  'Keberangkatan': 'Selesai',
};

export default function DashboardContainer() {
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [enrollments, setEnrollments] = useState<IUserEnrollment[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      getUserProfile(),
      getUserEnrollments(),
    ]).then(([profile, enrollData]) => {
      if (profile) setUser(profile);
      setEnrollments(enrollData.enrollments);
    }).finally(() => setIsLoading(false));
  }, []);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <span className='text-gray-400'>Memuat data...</span>
      </div>
    );
  }

  const hasEnrollments = enrollments.length > 0;

  return (
    <div className='flex gap-6 p-20'>
      <div className='w-64 flex-shrink-0'>
        <div className='rounded-2xl overflow-hidden h-fit'>
            <div className='relative'>
            <Image src={DashboardHero} alt='hero' className='w-full object-cover' />
            <div className='absolute top-6 left-4 right-0 p-4'>
                <h3 className='text-white text-lg font-bold'>
                Selamat Datang,<br />{user?.fullname ?? 'User'}!
                </h3>
                <p className='text-white/80 text-sm'>{user?.email ?? ''}</p>
            </div>
            </div>
        </div>
        </div>

      <div className='flex-1 space-y-6'>
        {hasEnrollments ? (
          <EnrolledContent enrollments={enrollments} />
        ) : (
          <EmptyContent />
        )}

        <div className=' rounded-3xl text-white relative overflow-hidden min-h-[200px]'>
            <Image src={ComingSoonBanner} alt='coming soon' className='object-cover' />
        </div>
      </div>
    </div>
  );
}

function EmptyContent() {
  const router = useRouter();

  return (
    <div className='rounded-2xl p-8 text-white relative overflow-hidden min-h-[280px] flex flex-col justify-center'>
      <Image
        src={EmptyHeroBg}
        alt='background'
        fill
        className='object-cover'
      />

      <div className='relative z-10'>
        <h2 className='text-2xl font-bold mb-2'>
          Siap Studi atau Berkarier di Luar Negeri?
        </h2>
        <p className='text-white/80 mb-6'>
          Temukan program abroad dan mulai perjalananmu
        </p>
        <button
          onClick={() => router.push('/daftar-posisi?program=karier')}
          className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-white px-6 py-3 rounded-full font-semibold w-fit hover:opacity-90 transition-opacity'
        >
          Daftar Sekarang
        </button>
      </div>
    </div>
  );
}

function EnrolledContent({ enrollments }: { enrollments: IUserEnrollment[] }) {
  const router = useRouter();

  return (
    <div>
      <h2 className='text-xl font-bold mb-4'>Program Abroad</h2>
      <div className='space-y-4'>
        {enrollments.map((enrollment) => {
          const stepLabel = STEP_LABELS[enrollment.registration_step] ?? enrollment.registration_step;
          const nextStep = NEXT_STEP_MAP[enrollment.registration_step] ?? '-';

          return (
            <div key={enrollment.id} className='bg-white border border-gray-200 rounded-2xl p-5'>
              <div className='flex items-center justify-between mb-4'>
                <h3 className='text-lg font-semibold'>
                  Program {enrollment.program}
                </h3>
                <button
                  onClick={() => router.push(`/user/enrollment/${enrollment.id}`)}
                  className='bg-Kzen-primary text-white px-4 py-1.5 rounded-full text-sm font-medium hover:opacity-90'
                >
                  Detail Program
                </button>
              </div>

              <div className='flex gap-4'>
                <div className='flex-1 border border-gray-200 rounded-xl p-4'>
                  <p className='text-xs text-gray-400 mb-1'>Tahap Pendaftaran</p>
                  <p className='text-sm font-semibold mb-2'>{stepLabel}</p>
                  <p className='text-xs text-gray-500 mb-3'>
                    Tim kami akan melakukan verifikasi dalam waktu 2 x 24 jam. Hubungi tim kami untuk informasi lebih lanjut
                  </p>
                  <p className='text-xs text-gray-400'>Berikutnya</p>
                  <p className='text-sm font-semibold'>{nextStep}</p>
                </div>

                <div className='flex flex-col gap-3 w-48'>
                  <div className='border border-gray-200 rounded-xl p-4'>
                    <p className='text-xs text-gray-400 mb-1'>Negara Tujuan</p>
                    <p className='text-sm font-semibold flex items-center gap-1'>
                      <Icon icon="basil:location-outline" width="14" />
                      {enrollment.region}
                    </p>
                  </div>
                  <div className='border border-gray-200 rounded-xl p-4'>
                    <p className='text-xs text-gray-400 mb-1'>Posisi</p>
                    <p className='text-sm font-semibold'>{enrollment.position}</p>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}