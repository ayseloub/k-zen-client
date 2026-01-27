'use client';

import React, { useRef } from 'react';
import { WebinarInfoDummy } from '@/shared/models/static/WebinarInfoDummy';
import WebinarCard from '@/shared/container/webinar-card/WebinarCard';
import { Icon } from '@iconify/react';

export default function SLComponent7() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  // Filter hanya webinar kategori studi
  const studiWebinars = WebinarInfoDummy.filter(
    (webinar) => webinar.category === 'studi'
  );

  return (
    <div className="py-20 px-20">
      <div className='flex items-center justify-between gap-20'>
        {/* Left side - Text content */}
        <div className="min-w-[400px]">
          <p className="text-Kzen-dark/90 text-xl font-light mb-2">Webinar K-Zen</p>
          <h1 className="text-5xl font-semibold mb-4">
            Jadwal <span className="text-Kzen-primary">Webinar</span><br/> Terdekat
          </h1>
          <p className="text-2xl text-Kzen-neutral/90 font-extralight mb-8">
            Tingkatkan pengetahuan dengan<br/> webinar pilihanmu
          </p>

          {/* Navigation arrows */}
          <div className="flex gap-4">
            <button
              onClick={() => scroll('left')}
              className="w-12 h-12 rounded-lg bg-Kzen-neutral/20 hover:bg-Kzen-primary hover:text-white transition-all flex items-center justify-center"
            >
              <Icon icon="tabler:arrow-left" width={45} height={45} />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-12 h-12 rounded-lg bg-Kzen-primary text-white hover:bg-Kzen-secondary transition-all flex items-center justify-center"
            >
              <Icon icon="tabler:arrow-right" width={45} height={45} />
            </button>
          </div>
        </div>

        {/* Right side - Horizontal scrollable cards */}
        <div className="flex-1 overflow-hidden">
          <div
            ref={scrollContainerRef}
            className="flex gap-6 overflow-x-auto scrollbar-hide scroll-smooth pb-4"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {studiWebinars.map((webinar, index) => (
              <div key={index} className="flex-shrink-0 w-[380px]">
                <WebinarCard
                  title={webinar.title}
                  description={webinar.description}
                  date={webinar.date}
                  price={webinar.price}
                  image={webinar.image}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}