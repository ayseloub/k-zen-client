'use client'
import React, { useState } from 'react'
import { AdvanceListJepang, AdvanceListCanada } from '@/shared/models/static/AdvanceList'
import Image from 'next/image'

type Country = 'jepang' | 'kanada'

export default function KPComponent2() {
  const [activeTab, setActiveTab] = useState<Country>('jepang')
  
  const currentData = activeTab === 'jepang' ? AdvanceListJepang : AdvanceListCanada

  return (
    <div className='p-24 space-y-10'>
        <section className='space-y-2 flex items-center justify-between'>
            <div>
                <h1 className='text-4xl font-semibold'>
                    <span className='text-Kzen-primary'>1001 Keunggulan</span> Gapai Karier di Luar Negeri
                </h1>
                <p className='text-xl font-extralight'>
                    Kenapa kerja di luar negeri akan jadi keputusan terbaikmu!
                </p>
            </div>
            
            <div className='flex gap-3'>
                <button
                    onClick={() => setActiveTab('jepang')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${
                        activeTab === 'jepang' 
                            ? 'bg-Kzen-primary/20 text-Kzen-primary border-Kzen-primary' 
                            : 'bg-gray-300/20 text-Kzen-dark border-2 border-gray-300'
                    }`}
                >
                    <span className='text-xl'>🇯🇵</span>
                    <span className='font-medium'>Jepang</span>
                </button>
                
                <button
                    onClick={() => setActiveTab('kanada')}
                    className={`flex items-center gap-2 px-6 py-2 rounded-full border transition-all ${
                        activeTab === 'kanada' 
                            ? 'bg-Kzen-primary/20 text-Kzen-primary border-Kzen-primary'
                            : 'bg-gray-300/20 text-Kzen-dark border-2 border-gray-300'
                    }`}
                >
                    <span className='text-xl'>🇨🇦</span>
                    <span className='font-medium'>Kanada</span>
                </button>
            </div>
        </section>
        
        <section className='grid grid-cols-4 gap-7'>
            {currentData.map((advance, index) => (
                <div key={index} className='flex border rounded-2xl items-center'>
                    <div className='w-1/6 h-full rounded-l-2xl p-2 bg-Kzen-neutral/10 items-center justify-center flex border-r-2'>
                        <Image
                            src={advance.icon}
                            alt={advance.title}
                            height={50}
                        />
                    </div>
                    <div className='ml-5 space-y-1 p-3'>
                        <h2 className='text-sm font-extralight'>{advance.title}</h2>
                        <p className='text-2xl font-semibold'>{advance.value}</p>
                    </div>
                </div>
            ))}
        </section>
    </div>
  )
}