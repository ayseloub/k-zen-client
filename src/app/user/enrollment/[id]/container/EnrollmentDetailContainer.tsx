'use client'

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { getUserEnrollmentDetail } from '@/shared/actions/productService';

const STEPS = [
  { status: 1, label: 'Pendaftaran Program' },
  { status: 2, label: 'Verifikasi Dokumen' },
  { status: 3, label: 'Pembayaran' },
  { status: 4, label: 'Pelatihan' },
  { status: 5, label: 'Verifikasi Dokumen Oleh Perusahaan' },
  { status: 6, label: 'Interview' },
  { status: 7, label: 'Offering' },
  { status: 8, label: 'Keberangkatan' },
];

const STATUS_LABELS: Record<number, string> = {
  1: 'Pendaftaran Program',
  2: 'Verifikasi Dokumen',
  3: 'Pembayaran',
  4: 'Pelatihan',
  5: 'Dokumen sedang diverifikasi',
  6: 'Interview',
  7: 'Offering',
  8: 'Keberangkatan',
};

const STEP_MESSAGES: Record<number, string> = {
  1: 'Tim kami akan melakukan verifikasi dalam waktu 2 x 24 jam. Hubungi tim kami untuk informasi lebih lanjut',
  2: 'Tim kami akan melakukan verifikasi dalam waktu 2 x 24 jam. Hubungi tim kami untuk informasi lebih lanjut',
  3: 'Selesaikan pembayaran untuk melanjutkan perjalananmu ke tahap berikutnya. Informasi Lebih Lanjut Hubungi Admin',
  4: 'Pendaftaran kamu saat ini berada pada tahap pelatihan. Silakan hubungi admin untuk informasi lebih lanjut.',
  5: 'Dokumen Anda sedang dalam proses verifikasi oleh perusahaan. Informasi selanjutnya akan disampaikan setelah proses seleksi.',
  6: 'Selamat kamu berhasil melanjutkan ke tahapan interview. Cek email secara berkala dan hubungi tim kami apabila ada pertanyaan lebih lanjut!',
  7: 'Selamat Anda telah melewati rangkaian proses dan dinyatakan diterima di Program Karier Profesional',
  8: 'Cek detail penawaran dan konfirmasikan untuk melanjutkan ke tahap berikutnya. Untuk informasi lebih lanjut, hubungi admin kami.',
};

const WA_NUMBER = '6281230675458';

export default function EnrollmentDetailContainer({ id }: { id: string }) {
  const router = useRouter();
  const [detail, setDetail] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getUserEnrollmentDetail(id)
      .then(setDetail)
      .finally(() => setIsLoading(false));
  }, [id]);

  if (isLoading) {
    return (
      <div className='flex items-center justify-center py-20'>
        <span className='text-gray-400'>Memuat data...</span>
      </div>
    );
  }

  if (!detail) {
    return (
      <div className='flex items-center justify-center py-20'>
        <span className='text-gray-400'>Data tidak ditemukan</span>
      </div>
    );
  }

  const { enrollment, document: documents } = detail;
  const currentStatus = enrollment.status;

  return (
    <div className='max-w-5xl mx-auto px-6 py-8'>
      {/* Header */}
      <div className='flex items-center justify-between mb-2'>
        <button onClick={() => router.back()}
          className='flex items-center gap-1 text-Kzen-primary font-medium hover:opacity-70'
        >
          <Icon icon="basil:caret-left-outline" width="20" /> Kembali
        </button>
      </div>

      <h1 className='text-xl font-bold text-center mb-8'>Pendaftaran Program Karier</h1>

      <div className='flex gap-8'>
        {/* Stepper */}
        <div className='w-56 flex-shrink-0'>
          <div className='bg-white border border-gray-200 rounded-2xl p-5'>
            {STEPS.map((step, index) => {
              const isDone = currentStatus > step.status;
              const isCurrent = currentStatus === step.status;
              const isLast = index === STEPS.length - 1;

              return (
                <div key={step.status} className='flex gap-3 relative'>
                  {!isLast && (
                    <div className={`absolute left-[11px] top-6 w-0.5 h-full ${
                      isDone ? 'bg-Kzen-primary' : 'bg-gray-200'
                    }`} />
                  )}

                  <div className={`relative z-10 w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 ${
                    isDone
                      ? 'bg-Kzen-primary'
                      : isCurrent
                      ? 'border-[3px] border-Kzen-primary bg-white'
                      : 'border-2 border-gray-300 bg-white'
                  }`}>
                    {isDone && <Icon icon="basil:check-outline" width="14" className='text-white' />}
                  </div>

                  <p className={`text-sm pb-6 ${
                    isDone || isCurrent ? 'text-gray-800 font-medium' : 'text-gray-400'
                  }`}>
                    {step.label}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Content */}
        <div className='flex-1 space-y-4'>
          {/* Info Card */}
          <div className='bg-white border border-gray-200 rounded-2xl p-6'>
            {/* Invoice Header */}
            {enrollment.invoice_number && (
              <div className='flex items-center gap-2 text-sm text-gray-500 mb-4'>
                <Icon icon="basil:document-outline" width="18" className='text-Kzen-primary' />
                <span>{enrollment.invoice_number}</span>
                <span>|</span>
                <span>{new Date(enrollment.enrollment_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })}</span>
              </div>
            )}

            {/* Status Badge */}
            {currentStatus === 3 && enrollment.transaction?.status === 'Success' && (
              <div className='flex justify-end mb-2'>
                <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-green-50 text-green-600'>
                  <Icon icon="basil:check-outline" width="14" /> Pembayaran Berhasil
                </span>
              </div>
            )}
            {currentStatus === 3 && !enrollment.transaction && (
              <div className='flex justify-end mb-2'>
                <span className='inline-flex items-center gap-1 px-3 py-1 rounded-full text-xs font-medium bg-yellow-50 text-yellow-600'>
                  <Icon icon="basil:time-outline" width="14" /> Menunggu Pembayaran
                </span>
              </div>
            )}

            <h3 className='text-lg font-semibold mb-4'>Pendaftaran Program Karier Profesional</h3>
            <div className='space-y-2'>
              <InfoRow label='Posisi:' value={enrollment.position} />
              <InfoRow label='Negara Tujuan:' value={enrollment.region} />
              <InfoRow label='Jenis Program:' value={enrollment.program} />
              <InfoRow label='Tanggal Pendaftaran:' value={new Date(enrollment.enrollment_date).toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' })} />
              {currentStatus >= 4 && (
                <InfoRow label='Status:' value={STATUS_LABELS[currentStatus]} />
              )}
            </div>
          </div>

          {/* Step 3: Pembayaran */}
          {currentStatus === 3 && (
            <div className='bg-white border border-gray-200 rounded-2xl p-6'>
              <h3 className='text-base font-semibold mb-4'>Rincian Biaya</h3>
              <div className='flex items-center justify-between mb-2'>
                <span className='text-sm text-gray-500'>Total Harga</span>
                <span className='text-lg font-bold text-gray-800'>
                  Rp{(enrollment.transaction?.nett_amount ?? 0).toLocaleString('id-ID')}
                </span>
              </div>
              <div className='flex items-center justify-between border-t border-gray-200 pt-2'>
                <span className='text-sm text-gray-500'>Subtotal</span>
                <span className='text-lg font-bold text-Kzen-primary'>
                  Rp{(enrollment.transaction?.nett_amount ?? 0).toLocaleString('id-ID')}
                </span>
              </div>
              {!enrollment.transaction && (
                <div className='flex justify-end mt-4'>
                  <button className='bg-gradient-to-r from-Kzen-secondary to-Kzen-primary text-white px-6 py-2 rounded-full text-sm font-medium hover:opacity-90'>
                    Bayar Sekarang
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Step 7: Offering Document */}
          {currentStatus === 7 && (
            <div className='bg-white border border-gray-200 rounded-2xl p-6'>
              <h3 className='text-base font-semibold mb-1'>Dokumen Offering</h3>
              <p className='text-sm text-gray-400 mb-4'>
                Selamat Anda telah melewati rangkaian proses dan dinyatakan diterima di Program Karier Profesional
              </p>
              <p className='text-sm font-medium mb-2'>Dokumen Offering</p>
              <div className='flex items-center justify-between border border-gray-200 rounded-xl px-4 py-3'>
                <div className='flex items-center gap-2 text-gray-700'>
                  <Icon icon="basil:document-outline" width="18" className='text-Kzen-primary' />
                  <span className='text-sm'>Offering Letter.pdf</span>
                </div>
                <button className='text-Kzen-primary hover:opacity-70'>
                  <Icon icon="basil:download-outline" width="18" />
                </button>
              </div>
            </div>
          )}

          {/* Bottom Info Banner */}
          <div className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary rounded-2xl px-6 py-4 flex items-center justify-between'>
            <div className='flex items-center gap-3 text-white'>
              <Icon icon="basil:time-outline" width="20" />
              <p className='text-sm'>{STEP_MESSAGES[currentStatus] ?? ''}</p>
            </div>
            <button
              onClick={() => window.open(`https://wa.me/${WA_NUMBER}`, '_blank')}
              className='flex-shrink-0 bg-white text-Kzen-primary px-4 py-2 rounded-full text-sm font-medium hover:opacity-90'
            >
              Hubungi via WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ============ Helper ============

function InfoRow({ label, value }: { label: string; value: string | null | undefined }) {
  return (
    <div className='flex'>
      <span className='w-44 text-gray-500 text-sm'>{label}</span>
      <span className='flex-1 text-gray-800 text-sm'>{value ?? '-'}</span>
    </div>
  );
}