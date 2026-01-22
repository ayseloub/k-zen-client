'use client';

import React, { useState } from 'react';
import { WebinarInfoDummy } from '@/shared/models/static/WebinarInfoDummy';
import WebinarCard from '../assets/WebinarCard';

type TabType = 'karir' | 'studi';

export default function HomeComponents6() {
  const [activeTab, setActiveTab] = useState<TabType>('karir');

  const filteredWebinars = WebinarInfoDummy.filter(
    (webinar) => webinar.category === activeTab
  );

  return (
    <div className="py-20 px-36">
        <div className='flex justify-between'>
            <section className="text-left mb-12">
                <p className="text-Kzen-dark/90 text-xl font-medium mb-2">Webinar K-Zen</p>
                <h1 className="text-4xl font-semibold mb-3">
                Jadwal <span className="text-Kzen-primary">Webinar</span> Terdekat
                </h1>
                <h2 className="text-2xl text-Kzen-neutral/90">
                Tingkatkan pengetahuan dengan webinar pilihanmu
                </h2>
            </section>

            <section className="flex justify-center gap-8 mb-12 text-xl">
                <button
                onClick={() => setActiveTab('karir')}
                className={`relative pb-2 font-medium transition-colors duration-300 ${
                    activeTab === 'karir'
                    ? 'text-Kzen-primary underline'
                    : 'text-Kzen-neutral/80 hover:text-Kzen-secondary'
                }`}
                >
                Karir Profesional
                {activeTab === 'karir' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kzen-primary" />
                )}
                </button>

                <button
                onClick={() => setActiveTab('studi')}
                className={`relative pb-2 font-medium transition-colors duration-300 ${
                    activeTab === 'studi'
                    ? 'text-Kzen-primary underline'
                    : 'text-Kzen-neutral/80 hover:text-Kzen-secondary'
                }`}
                >
                Studi Lanjut
                {activeTab === 'studi' && (
                    <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-kzen-primary" />
                )}
                </button>
            </section>
        </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredWebinars.map((webinar, index) => (
          <WebinarCard
            key={index}
            title={webinar.title}
            description={webinar.description}
            date={webinar.date}
            price={webinar.price}
            image={webinar.image}
          />
        ))}
      </section>

      <div className="flex justify-center mt-12">
        <button className="px-8 py-3 border-2 border-Kzen-secondary text-Kzen-secondary rounded-full font-medium hover:bg-Kzen-primary hover:text-white transition-all duration-300">
          Lihat Lainnya
        </button>
      </div>
    </div>
  );
}