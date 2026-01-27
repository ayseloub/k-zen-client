'use client';
import check from "@/shared/assets/images/check.png"
import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';

interface IBenefit {
  value: string[];
  country: string;
}

interface BenefitCardProps {
  heroImage: StaticImageData;
  benefitData: IBenefit[];
  title: string;
  subtitle: string;
  buttonText?: string;
}

export default function BenefitCard({ 
  heroImage, 
  benefitData, 
  title, 
  subtitle,
  buttonText = "Daftar Sekarang"
}: BenefitCardProps) {
  const [activeCountry, setActiveCountry] = useState<string>(benefitData[0]?.country || 'japan');

  const activeBenefit = benefitData.find(benefit => benefit.country === activeCountry);

  const getCountryLabel = (country: string) => {
    switch(country.toLowerCase()) {
      case 'japan': return 'Jepang';
      case 'kanada': return 'Kanada';
      case 'china': return 'China';
      default: return country;
    }
  };

  const getCountryFlag = (country: string) => {
    switch(country.toLowerCase()) {
      case 'japan': return '🇯🇵';
      case 'kanada': return '🇨🇦';
      case 'china': return '🇨🇳';
      default: return '🌏';
    }
  };

  return (
    <div className='py-20'>
      <div className='flex items-center gap-16'>
        <div className='relative flex-shrink-0'>
          <Image
            src={heroImage}
            alt='benefit hero'
            width={600}
            height={700}
            className='object-contain'
            style={{
              maskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)',
              WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 15%, black 100%)'
            }}
          />
        </div>

        <div className='ml-20 flex-1'>
          <h1 className='text-5xl font-semibold mb-4'>
            <span dangerouslySetInnerHTML={{ __html: title }} />
          </h1>
          
          <p className='text-xl font-light text-Kzen-neutral/80 mb-8'>
            <span dangerouslySetInnerHTML={{ __html: subtitle }} />
          </p>

          <div className='flex gap-4 mb-8'>
            {benefitData.map((benefit) => (
              <button
                key={benefit.country}
                onClick={() => setActiveCountry(benefit.country)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                  activeCountry === benefit.country
                    ? 'bg-Kzen-primary text-white border-Kzen-primary shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-Kzen-primary'
                }`}
              >
                <span className='text-xl'>{getCountryFlag(benefit.country)}</span>
                <span className='font-medium'>{getCountryLabel(benefit.country)}</span>
              </button>
            ))}
          </div>

          <div className='mb-8'>
            <h3 className='text-xl font-semibold mb-4 text-Kzen-dark'>
              Benefit yang akan kamu dapatkan:
            </h3>
            <div className='space-y-3'>
              {activeBenefit?.value.map((benefit, index) => (
                <div key={index} className='flex items-start gap-3'>
                  <Image 
                    src={check}
                    alt="check"
                    width={24}
                    height={24}
                    className="flex-shrink-0 mt-1"
                  />
                  <span className='text-lg text-Kzen-dark'>{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-white px-10 py-4 rounded-full text-lg font-extralight shadow-xl hover:shadow-2xl hover:scale-105 transition-all'>
            {buttonText}
          </button>
        </div>
      </div>
    </div>
  );
}