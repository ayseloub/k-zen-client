'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import check from "@/shared/assets/images/check.png";
import heroKarir from "@/shared/assets/images/KarirBenefitHero.png";
import heroStudi from "@/shared/assets/images/StudiBenefitHero.png";
import { KarirBenefit, StudiBenefit } from '@/shared/models/static/BenefitList';

type Category = 'karir' | 'studi';

export default function HomeComponents5() {
  const [activeCategory, setActiveCategory] = useState<Category>('karir');
  const [activeCountry, setActiveCountry] = useState<string>('japan');

  const categoryData = activeCategory === 'karir' ? KarirBenefit : StudiBenefit;
  
  const activeBenefit = categoryData.find(item => item.country === activeCountry);
  
  const handleCategoryChange = (category: Category) => {
    setActiveCategory(category);
    const firstCountry = category === 'karir' ? KarirBenefit[0]?.country : StudiBenefit[0]?.country;
    if (firstCountry) setActiveCountry(firstCountry);
  };

  const heroImage = activeCategory === 'karir' ? heroKarir : heroStudi;

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
      <div className='text-center mb-12'>
        <h1 className='text-5xl font-semibold mb-4'>
          1000+ K-Zeners <span className='text-Kzen-primary'>Telah Percaya</span> Kepada Kami
        </h1>
        <p className='text-xl font-light text-Kzen-neutral/80'>
          Tingkatkan karier profesional dan studi lanjut kamu bersama K-Zen
        </p>
      </div>

      <div className='flex justify-center gap-8 mb-12'>
        <button
          onClick={() => handleCategoryChange('karir')}
          className={`text-xl pb-2 font-semibold transition-all ${
            activeCategory === 'karir'
              ? 'text-Kzen-primary border-b-2 border-Kzen-primary'
              : 'text-Kzen-neutral/70 hover:text-Kzen-primary'
          }`}
        >
          Karier Profesional
        </button>
        <button
          onClick={() => handleCategoryChange('studi')}
          className={`text-xl pb-2 font-semibold transition-all ${
            activeCategory === 'studi'
              ? 'text-Kzen-primary border-b-2 border-Kzen-primary'
              : 'text-Kzen-neutral/70 hover:text-Kzen-primary'
          }`}
        >
          Studi Lanjut
        </button>
      </div>

      <div className='flex items-center gap-32'>
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

        <div className='flex-1'>
          <div className='flex gap-4 mb-6'>
            {categoryData.map((item) => (
              <button
                key={item.country}
                onClick={() => setActiveCountry(item.country)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg border transition-all ${
                  activeCountry === item.country
                    ? 'bg-Kzen-primary text-white border-Kzen-primary shadow-lg'
                    : 'bg-white text-gray-700 border-gray-300 hover:border-Kzen-primary'
                }`}
              >
                <span className='text-xl'>{getCountryFlag(item.country)}</span>
                <span className='font-medium'>{getCountryLabel(item.country)}</span>
              </button>
            ))}
          </div>

          <h2 className='text-3xl font-semibold mb-3 text-Kzen-dark'>
            {activeCategory === 'karir' ? 'Karier Profesional' : 'Studi Lanjut'} di {getCountryLabel(activeCountry)}
          </h2>

          {activeBenefit?.description && (
            <p className='text-lg text-Kzen-neutral/80 mb-6'>
              {activeBenefit.description}
            </p>
          )}

          <div className='space-y-3 mb-8'>
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

          <div className='flex gap-4'>
            <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-white px-8 py-3 rounded-full font-semibold shadow-xl hover:shadow-2xl hover:scale-105 transition-all'>
              Daftar Sekarang
            </button>
            <button className='bg-white text-Kzen-primary border-2 border-Kzen-primary px-8 py-3 rounded-full font-semibold hover:bg-Kzen-primary hover:text-white transition-all'>
              Selengkapnya
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}