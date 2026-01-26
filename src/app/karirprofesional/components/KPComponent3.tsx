import React from 'react'
import { perusahaan } from '@/shared/models/static/SponsorList';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export default function KPComponent3() {
  return (
    <div className='flex items-center justify-center gap-20 px-20 py-16'>
        <section className='w-1/2 space-y-5'>
            <Marquee gradient={false} speed={80} direction='left'>
                {perusahaan.map((perusahaan, index) => (
                    <div key={index} className='flex gap-10'>
                        <Image src={perusahaan.image} alt='sponsor logo' className='mx-10' height={70} />
                    </div>
                ))}
            </Marquee>
        </section>
        <section className='text-left w-1/2'>
          <h1 className='text-Kzen-primary text-5xl font-semibold'>Dipercaya 10+ mitra</h1>
          <h2 className='text-4xl font-light text-Kzen-dark'>untuk mendukung perjalanan<br/> Karier kamu</h2>
        </section>
    </div>
  )
}
