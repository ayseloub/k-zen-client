'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { message } from 'antd';
import { IUpdateProfilePayload, IUserProfile } from '@/shared/models/interface/authinterfaces';
import { getUserProfile, updateProfile } from '@/shared/actions/authService';
import Step1PersonalInfo from './steps/Step1PersonalInfo';
import Step2DokumenLegal from './steps/Step2DokumenLegal';
import Step3PendidikanTerakhir from './steps/Step3PendidikanTerakhir';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { Icon } from '@iconify/react';

const STEPS = [
  { key: 'personal-info', label: 'Personal Info' },
  { key: 'dokumen-legal', label: 'Dokumen Legal' },
  { key: 'pendidikan-terakhir', label: 'Pendidikan Terakhir' },
];

function mapProfileToPayload(profile: IUserProfile): Partial<IUpdateProfilePayload> {
  return {
    fullname: profile.fullname ?? undefined,
    phone: profile.phone ?? undefined,
    nik: profile.nik ?? undefined,
    date_of_birth: profile.date_of_birth ?? undefined,
    gender: profile.gender ?? undefined,
    address: profile.address ?? undefined,
    domicile_address: profile.domicile_address ?? undefined,
    last_education: profile.last_education ?? undefined,
    major: profile.major ?? undefined,
  };
}

export default function ProfileStepper() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(0);
  const [isPending, setIsPending] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [formData, setFormData] = useState<Partial<IUpdateProfilePayload>>({});

  useEffect(() => {
    getUserProfile()
      .then((profile) => {
        if (profile) {
          setFormData(mapProfileToPayload(profile));
        }
      })
      .finally(() => setIsLoading(false));
  }, []);

  const updateFormData = (data: Partial<IUpdateProfilePayload>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  const handleNext = (data: Partial<IUpdateProfilePayload>) => {
    updateFormData(data);
    setCurrentStep((prev) => prev + 1);
  };

  const handleBack = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (data: Partial<IUpdateProfilePayload>) => {
    const finalData = { ...formData, ...data };
    setIsPending(true);

    try {
      const fd = new FormData();

      if (finalData.avatar) fd.append('avatar', finalData.avatar);
      if (finalData.fullname) fd.append('fullname', finalData.fullname);
      if (finalData.nik) fd.append('nik', finalData.nik);
      if (finalData.gender !== undefined && finalData.gender !== null) fd.append('gender', String(finalData.gender));
      if (finalData.phone) fd.append('phone', finalData.phone);
      if (finalData.address) fd.append('address', finalData.address);
      if (finalData.domicile_address) fd.append('domicile_address', finalData.domicile_address);
      if (finalData.date_of_birth) fd.append('date_of_birth', finalData.date_of_birth);
      if (finalData.last_education) fd.append('last_education', finalData.last_education);
      if (finalData.major) fd.append('major', finalData.major);
      if (finalData.ktp) fd.append('document_ktp', finalData.ktp);
      if (finalData.kk) fd.append('document_kk', finalData.kk);
      if (finalData.akta_kelahiran) fd.append('document_akta', finalData.akta_kelahiran);
      if (finalData.ijazah) fd.append('document_ijazah', finalData.ijazah);

      const res = await updateProfile(fd);
      if (res.success) {
        message.success(res.message);
        router.replace('/user/profile/personal-info');
      } else {
        message.error(res.message);
      }
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
        <Image src={Logo} alt='Logo' width={110} />
        <button
          onClick={() => router.replace('/user/profile/personal-info')}
          className='flex items-center gap-1 text-Kzen-primary font-medium hover:opacity-70'
        >
          Lewati
          <Icon icon="basil:arrow-right-outline" width="20" height="20" />
        </button>
      </div>

      <div className='flex items-center justify-center gap-4 py-6'>
        {STEPS.map((step, index) => (
          <div key={step.key} className='flex items-center gap-4'>
            <div className='flex items-center gap-2'>
              <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-semibold ${
                index < currentStep
                  ? 'bg-Kzen-primary text-white'
                  : index === currentStep
                  ? 'border-2 border-Kzen-primary text-Kzen-primary'
                  : 'border-2 border-gray-300 text-gray-300'
              }`}>
                {index < currentStep ? (
                  <Icon icon="basil:check-outline" width="14" height="14" />
                ) : (
                  index + 1
                )}
              </div>
              <span className={`text-sm font-medium ${
                index <= currentStep ? 'text-Kzen-primary' : 'text-gray-400'
              }`}>
                {step.label}
              </span>
            </div>

            {index < STEPS.length - 1 && (
              <div className='flex gap-1'>
                {[...Array(3)].map((_, i) => (
                  <div
                    key={i}
                    className={`w-1.5 h-1.5 rounded-full ${
                      index < currentStep ? 'bg-Kzen-primary' : 'bg-gray-300'
                    }`}
                  />
                ))}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='w-[70%] mx-auto px-4 pb-8'>
        {currentStep === 0 && (
          <Step1PersonalInfo
            defaultValues={formData}
            onNext={handleNext}
          />
        )}
        {currentStep === 1 && (
          <Step2DokumenLegal
            defaultValues={formData}
            onNext={handleNext}
            onBack={handleBack}
          />
        )}
        {currentStep === 2 && (
          <Step3PendidikanTerakhir
            defaultValues={formData}
            onSubmit={handleSubmit}
            onBack={handleBack}
            isPending={isPending}
          />
        )}
      </div>
    </div>
  );
}