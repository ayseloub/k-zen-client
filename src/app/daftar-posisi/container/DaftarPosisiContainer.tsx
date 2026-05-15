'use client'

import React, { Suspense } from 'react';
import { Input, Select } from 'antd';
import { Icon } from '@iconify/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import Logo from '@/shared/assets/images/logo.svg';
import { useDaftarPosisi } from './usecase/useDaftarPosisi';
import { IPosition } from '@/shared/models/interface/productInterfaces';

type ProgramTab = 'karier' | 'studi';

const TABS: { key: ProgramTab; label: string }[] = [
  { key: 'karier', label: 'Karier Profesional' },
  { key: 'studi', label: 'Studi Lanjut' },
];

const REGION_FLAGS: Record<string, string> = {
  'Jepang': '🇯🇵',
  'Kanada': '🇨🇦',
  'China': '🇨🇳',
};

function DaftarPosisiContent() {
  const router = useRouter();
  const {
    positions, meta, regions, mainProductId,
    isLoading,
    activeTab, setActiveTab,
    activeRegionId, setActiveRegionId,
    search, setSearch,
    page, setPage,
  } = useDaftarPosisi();

  const totalPages = meta.last_page || 1;
  const activeRegion = regions.find((r) => r.id === activeRegionId);

  return (
    <div className='min-h-screen bg-gray-50'>
      <div className='max-w-6xl mx-auto px-6 py-6'>
        <div className='flex items-center justify-between mb-8'>
          <button onClick={() => router.back()}
            className='flex items-center gap-1 text-Kzen-primary font-medium hover:opacity-70'
          >
            <Icon icon="basil:caret-left-outline" width="20" /> Kembali
          </button>
          <Image src={Logo} alt='Logo' width={90} />
        </div>

        <div className='flex items-start justify-between mb-6'>
          <div>
            <h1 className='text-2xl font-bold mb-1'>Daftar Posisi</h1>
            <p className='text-gray-400'>Your Global Journey Starts Here #FromZeroToGlobal</p>
          </div>

          <div className='flex gap-6'>
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`text-lg pb-1 font-semibold transition-all ${
                  activeTab === tab.key
                    ? 'text-Kzen-primary border-b-2 border-Kzen-primary'
                    : 'text-gray-400 hover:text-Kzen-primary'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        <div className='flex items-center justify-between mb-6'>
          <div className='flex gap-2'>
            {regions.map((region) => (
              <button
                key={region.id}
                onClick={() => setActiveRegionId(region.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-medium transition-all ${
                  activeRegionId === region.id
                    ? 'bg-Kzen-primary text-white border-Kzen-primary'
                    : 'bg-white text-gray-600 border-gray-200 hover:border-Kzen-primary'
                }`}
              >
                <span>{REGION_FLAGS[region.name] ?? '🌏'}</span>
                {region.name}
              </button>
            ))}
          </div>

          <div className='flex items-center gap-3'>
            <Input
              placeholder='Cari Posisi'
              prefix={<Icon icon="basil:search-outline" width="18" className='text-gray-400' />}
              className='w-48 rounded-lg'
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              allowClear
            />
            <Select placeholder='Urutkan' className='w-32' allowClear
              options={[
                { value: 'newest', label: 'Terbaru' },
                { value: 'oldest', label: 'Terlama' },
                { value: 'az', label: 'A-Z' },
              ]}
            />
          </div>
        </div>

        {isLoading ? (
          <div className='text-center py-20 text-gray-400'>Memuat data...</div>
        ) : positions.length === 0 ? (
          <div className='text-center py-20 text-gray-400'>Tidak ada posisi tersedia</div>
        ) : (
          <div className='grid grid-cols-3 gap-4 mb-6'>
            {positions.map((position) => (
              <PositionCard
                key={position.id}
                position={position}
                region={activeRegion?.name ?? ''}
                programLabel={activeTab === 'karier' ? 'Karier' : 'Studi'}
                productId={mainProductId}
              />
            ))}
          </div>
        )}

        <div className='flex items-center justify-center gap-2 pb-8'>
          <button onClick={() => setPage((p) => Math.max(1, p - 1))} disabled={page <= 1}
            className='w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 text-gray-500 hover:bg-gray-100 disabled:opacity-40'
          >
            <Icon icon="basil:caret-left-outline" width="18" />
          </button>
          <span className='text-sm text-gray-600 px-2'>
            {page} <span className='text-gray-400'>dari</span> {totalPages}
          </span>
          <button onClick={() => setPage((p) => Math.min(totalPages, p + 1))} disabled={page >= totalPages}
            className='w-9 h-9 flex items-center justify-center rounded-lg bg-Kzen-primary text-white hover:opacity-90 disabled:opacity-40'
          >
            <Icon icon="basil:caret-right-outline" width="18" />
          </button>
        </div>
      </div>
    </div>
  );
}

export default function DaftarPosisiContainer() {
  return (
    <Suspense fallback={<div className='min-h-screen bg-gray-50 flex items-center justify-center text-gray-400'>Memuat...</div>}>
      <DaftarPosisiContent />
    </Suspense>
  );
}

function PositionCard({ position, region, programLabel, productId }: {
  position: IPosition;
  region: string;
  programLabel: string;
  productId: string;
}) {
  const router = useRouter();

  return (
    <div className='bg-white rounded-2xl border border-gray-200 p-5'>
      <h3 className='text-base font-semibold text-gray-800 mb-3'>{position.name}</h3>
      <div className='flex items-center gap-2 mb-4'>
        <span className='flex items-center gap-1 text-sm text-gray-500'>
          <Icon icon="basil:location-outline" width="16" /> {region}
        </span>
        <span className='px-2 py-0.5 bg-Kzen-primary/10 text-Kzen-primary text-xs font-medium rounded'>
          {programLabel}
        </span>
      </div>
      <button
        onClick={() => router.push(`/daftar-posisi/${position.id}/daftar?product_id=${productId}`)}
        className='bg-gradient-to-r from-Kzen-secondary to-Kzen-primary text-white px-5 py-2 rounded-full text-sm font-medium hover:opacity-90 transition-opacity'
      >
        Daftar Program
      </button>
    </div>
  );
}