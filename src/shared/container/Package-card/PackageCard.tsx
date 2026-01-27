'use client';

import React, { useState } from 'react';
import Image, { StaticImageData } from 'next/image';
import platinum from "@/shared/assets/images/badges/platinum.png";
import gold from "@/shared/assets/images/badges/gold.png";
import silver from "@/shared/assets/images/badges/silver.png";
import { Icon } from '@iconify/react';

interface IPackage {
  value: string[];
  price: string;
  total: string;
  type: string;
}

interface PackageCardProps {
  packageData: IPackage[];
  heroImage: StaticImageData;
  title?: string;
  subtitle?: string;
}

export default function PackageCard({ 
  packageData, 
  heroImage,
  title = "Masih Kurang Percaya Diri?",
  subtitle = "Paket Belajar Bahasa untuk Bekal Kamu Nanti!"
}: PackageCardProps) {
  const [selectedPackage, setSelectedPackage] = useState<string>(packageData[0]?.type || 'Platinum');

  const activePackage = packageData.find(pkg => pkg.type === selectedPackage);

  const getPackageIcon = (type: string) => {
    switch(type) {
      case 'Platinum': return platinum;
      case 'Gold': return gold;
      case 'Silver': return silver;
      default: return silver;
    }
  };

  return (
    <div className='py-20 px-20 text-center'>
      <section className='mb-12'>
        <h1 className='text-4xl font-semibold mb-2'>
          <span dangerouslySetInnerHTML={{ __html: title }} />
        </h1>
        <p className='text-xl font-light text-Kzen-neutral/80'>
          {subtitle}
        </p>
      </section>

      <section className='max-w-5xl mx-auto'>
        <div className='bg-gradient-to-r from-[#0068AD] to-[#2D82BB] rounded-3xl p-8 flex items-center gap-8'>
          <div className='flex-shrink-0'>
            <Image
              src={heroImage}
              alt='package hero'
              height={450}
              className='object-contain'
            />
          </div>
          <div className='bg-white rounded-2xl p-5 w-full'>
            <div className='flex-1 bg-white border border-gray-200/5 shadow-2xl rounded-2xl p-8'>
              <div className='mb-6'>
                <h3 className='text-left text-lg font-semibold mb-3 text-Kzen-dark'>
                  Pilihan Paket
                </h3>
                <div className='flex gap-3'>
                  {packageData.map((pkg) => (
                    <button
                      key={pkg.type}
                      onClick={() => setSelectedPackage(pkg.type)}
                      className={`flex items-center gap-2 px-5 py-2 rounded-full border transition-all ${
                        selectedPackage === pkg.type
                          ? 'bg-Kzen-primary/10 border-Kzen-primary text-Kzen-primary'
                          : 'bg-white border-gray-300 text-gray-600 hover:border-Kzen-primary'
                      }`}
                    >
                      <Image 
                        src={getPackageIcon(pkg.type)}
                        alt={pkg.type}
                        width={20}
                        height={20}
                        className='object-contain'
                      />
                      <span className='font-medium'>{pkg.type}</span>
                    </button>
                  ))}
                </div>
              </div>

              <div className='mb-6'>
                <h3 className='text-left text-lg font-semibold mb-3 text-Kzen-dark'>
                  Benefit
                </h3>
                <div className='grid grid-cols-2 gap-3'>
                  {activePackage?.value.map((benefit, index) => (
                    <div key={index} className='flex items-center gap-2 text-left'>
                      <Icon 
                        icon="lets-icons:check-fill" 
                        width={20} 
                        className="text-green-500 flex-shrink-0"
                      />
                      <span className='text-sm text-Kzen-dark'>{benefit}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className='flex items-end justify-between mb-6'>
                <div className='text-left'>
                  <p className='text-3xl font-bold text-Kzen-primary'>
                    {activePackage?.price}
                  </p>
                  <p className='text-sm text-gray-500'>
                    Hemat hingga {activePackage?.total}
                  </p>
                </div>

                <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-white px-8 py-3 rounded-full font-extralight shadow-xl hover:bg-Kzen-secondary transition-all'>
                  Ambil Paket
                </button>
              </div>
            </div>
          </div>    
        </div>
      </section>
    </div>
  );
}