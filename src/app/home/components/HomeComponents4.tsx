'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TestimonyDummy } from '@/shared/models/static/TestimonyDummy';
import pict from '@/shared/assets/images/TestimonyPict.png';

export default function HomeComponents4() {
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTestimony = TestimonyDummy[activeIndex];

  return (
    <div className="py-20 px-36">
      <section className="bottom-[-10]">
        <h1 className="text-4xl font-semibold">
          Dari Mimpi jadi <span className="text-Kzen-primary">Prestasi</span>
        </h1>
        <p className="text-xl font-light text-gray-500">
          Apa kata K-Zeners mengenai perjalanan mereka
        </p>
      </section>

      <section className="">
        <div className="flex items-center gap-12">
          <div className="flex-1">
            
            <div 
              key={activeIndex}
              className="animate-in fade-in duration-500"
            >
              <p className="text-2xl text-gray-700 leading-relaxed">
                {activeTestimony.testimony}
              </p>
            </div>

            <div className="pt-2">
              <p className="text-xl font-light text-Kzen-neutral/80">
                {activeTestimony.name} - {activeTestimony.program}
              </p>
            </div>
          </div>

          <div className="relative flex-shrink-0">
            <div className="relative">
              <Image
                src={pict}
                alt="testimony"
                width={500}
              />
            </div>
          </div>

          <div className="flex flex-col gap-4 flex-shrink-0">
            {TestimonyDummy.map((item, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`flex items-center gap-3 p-4 rounded-xl transition-all duration-300 min-w-[250px] ${
                  activeIndex === index
                    ? 'bg-Kzen-primary text-white shadow-xl scale-105'
                    : 'bg-white border-2 border-gray-200 hover:border-Kzen-primary hover:shadow-md'
                }`}
              >
                <div className="relative">
                  <Image
                    src={item.image}
                    alt={item.name}
                    width={48}
                    height={48}
                    className="rounded-full object-cover"
                  />
                  {activeIndex === index && (
                    <div className="absolute -top-1 -right-1 w-4 h-4 bg-white rounded-full border-2 border-Kzen-primary" />
                  )}
                </div>
                <div className="text-left">
                  <p className={`font-semibold ${activeIndex === index ? 'text-white' : 'text-gray-900'}`}>
                    {item.name}
                  </p>
                  <p className={`text-sm ${activeIndex === index ? 'text-white/80' : 'text-gray-500'}`}>
                    {item.program}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}