import React from 'react'
import { AdvanceListChina } from '@/shared/models/static/AdvanceList'
import Image from 'next/image'

export default function SLComponent2() {
  return (
    <div className='p-24 space-y-10'>
        <section className='space-y-2'>
            <h1 className='text-4xl font-semibold'><span className='text-Kzen-primary'>1001 Keunggulan</span> Kuliah di Luar Negeri</h1>
            <p className='text-xl font-extralight'>Alasan studi lanjut di luar negeri akan jadi keputusan terbaikmu!</p>
        </section>
        <section className='grid grid-cols-4 gap-7'>
            {AdvanceListChina.map((advance, index) => (
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
