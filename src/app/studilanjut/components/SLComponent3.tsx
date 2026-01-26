import React from 'react'
import { kampus } from '@/shared/models/static/SponsorList';
import Marquee from 'react-fast-marquee';
import Image from 'next/image';

export default function SLComponent3() {
  return (
    <div className='flex items-center justify-center gap-20 px-20 py-16'>
        <section className='w-1/2 space-y-5'>
            <Marquee gradient={false} speed={80} direction='left'>
                {kampus.map((campus, index) => (
                    <div key={index} className='flex gap-10'>
                        <Image src={campus.image} alt='sponsor logo' className='mx-5' height={85} />
                    </div>
                ))}
            </Marquee>
        </section>
        <section className='text-left w-1/2'>
          <h1 className='text-Kzen-primary text-5xl font-semibold'>Dipercaya 15+ mitra</h1>
          <h2 className='text-4xl font-light text-Kzen-dark'>untuk mendukung perjalanan<br/> studi kamu</h2>
        </section>
    </div>
  )
}
