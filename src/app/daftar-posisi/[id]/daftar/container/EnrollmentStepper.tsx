'use client'

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { message } from 'antd';
import Image from 'next/image';
import { Icon } from '@iconify/react';
import Logo from '@/shared/assets/images/logo.svg';
import { getUserProfile } from '@/shared/actions/authService';
import { IUserProfile } from '@/shared/models/interface/authinterfaces';
import { enrollProduct } from '@/shared/actions/productService';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2DokumenLegal from './steps/Step2DokumenLegal';
import Step3PendidikanTerakhir from './steps/Step3PendidikanTerakhir';
import Step4InformasiTambahan from './steps/Step4InformasiTambahan';
import Step5Persetujuan from './steps/Step5Konfirmasi';

const STEPS = [
  { key: 'personal-info', label: 'Personal Info' },
  { key: 'dokumen-legal', label: 'Dokumen Legal' },
  { key: 'pendidikan-terakhir', label: 'Pendidikan Terakhir' },
  { key: 'informasi-tambahan', label: 'Informasi Tambahan' },
  { key: 'persetujuan', label: 'Persetujuan' },
];

interface IEnrollmentData {
  document_kesehatan?: File;
  document_komitmen?: File;
  document_komitmen_cpmi?: File;
  document_pernyataan_kuasa?: File;
  tinggi_badan?: string;
}

export default function EnrollmentStepper({ positionId }: { positionId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const productId = searchParams.get('product_id') ?? '';

  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState<IUserProfile | null>(null);
  const [enrollmentData, setEnrollmentData] = useState<IEnrollmentData>({});

  useEffect(() => {
    getUserProfile()
      .then((profile) => { if (profile) setUser(profile); })
      .finally(() => setIsLoading(false));
  }, []);

  const handleNext = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleStep4Data = (data: any) => {
    setEnrollmentData((prev) => ({ ...prev, ...data }));
    handleNext();
  };

  const handleStep5Submit = async (data: any) => {
    const allData = { ...enrollmentData, ...data };

    if (!productId) {
      message.error('Product ID tidak ditemukan');
      return;
    }

    setIsPending(true);
    try {
      const fd = new FormData();
      fd.append('product_id', productId);
      fd.append('position_id', positionId);

      if (allData.document_kesehatan) fd.append('document_kesehatan', allData.document_kesehatan);
      if (allData.document_komitmen) fd.append('document_komitmen', allData.document_komitmen);
      if (allData.document_komitmen_cpmi) fd.append('document_komitmen_cpmi', allData.document_komitmen_cpmi);
      if (allData.document_pernyataan_kuasa) fd.append('document_pernyataan_kuasa', allData.document_pernyataan_kuasa);

      const res = await enrollProduct(fd);

      if (res.success) {
        message.success(res.message);
        router.replace('/user/profile/personal-info');
      } else {
        message.error(res.message);
      }
    } catch (error) {
      message.error('Terjadi kesalahan saat mendaftar');
    } finally {
      setIsPending(false);
    }
  };

  if (isLoading) {
    return (
      <div className='min-h-screen bg-gray-50 flex items-center justify-center'>
        <span className='text-gray-400'>Memuat data...</span>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='flex items-center justify-between px-8 py-4 bg-white shadow-sm'>
        <button onClick={() => router.back()}
          className='flex items-center gap-1 text-Kzen-primary font-medium hover:opacity-70'
        >
          <Icon icon="basil:caret-left-outline" width="20" /> Kembali
        </button>
        <Image src={Logo} alt='Logo' width={90} />
      </div>

      <div className='flex items-center justify-center gap-2 py-6 px-4'>
        {STEPS.map((step, index) => (
          <div key={step.key} className='flex items-center gap-2'>
            <div className='flex items-center gap-2'>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                index < currentStep
                  ? 'bg-Kzen-primary text-white'
                  : index === currentStep
                  ? 'border-2 border-Kzen-primary text-Kzen-primary'
                  : 'border-2 border-gray-300 text-gray-300'
              }`}>
                {index < currentStep ? (
                  <Icon icon="basil:check-outline" width="14" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-xs font-medium ${
                index <= currentStep ? 'text-Kzen-primary' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div className='flex gap-1'>
                {[...Array(3)].map((_, i) => (
                  <div key={i} className={`w-1 h-1 rounded-full ${
                    index < currentStep ? 'bg-Kzen-primary' : 'bg-gray-300'
                  }`} />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='text-center mb-6'>
        <h1 className='text-2xl font-bold'>Pendaftaran Program</h1>
        <p className='text-gray-500 mt-1'>Periksa dan pastikan bahwa data diri kamu telah sesuai ya!</p>
      </div>

      <div className='w-[70%] mx-auto pb-8'>
        {currentStep === 0 && (
          <Step1PersonalInfo user={user} onNext={handleNext} />
        )}
        {currentStep === 1 && (
          <Step2DokumenLegal onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 2 && (
          <Step3PendidikanTerakhir user={user} onNext={handleNext} onBack={handleBack} />
        )}
        {currentStep === 3 && (
          <Step4InformasiTambahan onNext={handleStep4Data} onBack={handleBack} />
        )}
        {currentStep === 4 && (
          <Step5Persetujuan
            onSubmit={handleStep5Submit}
            onBack={handleBack}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}