import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image'
import { kampus, perusahaan } from '@/shared/models/static/SponsorList';




export default function HomeCommponents3() {
  return (
    <div className='flex mt-10 mx-10 items-center space-x-10'>
        <section className='w-1/2 space-y-7 h-max-50'>
          <Marquee gradient={false} speed={80} direction='left'>
            {kampus.map((campus, index) => (
                    <div key={index} className='flex gap-10'>
                        <Image src={campus.image} alt='sponsor logo' className='mx-5' height={85} />
                    </div>
                ))}
          </Marquee>
          <Marquee gradient={false} speed={80} direction='right'>
            {perusahaan.map((perusahaan, index) => (
                    <div key={index} className='flex gap-10'>
                        <Image src={perusahaan.image} alt='sponsor logo' className='mx-10' height={70} />
                    </div>
                ))}
          </Marquee>
          
        </section>
        <section className='text-left w-1/2'>
          <h1 className='text-Kzen-primary text-5xl font-semibold'>Dipercaya 20+ mitra</h1>
          <h2 className='text-4xl font-light text-Kzen-neutral'>untuk mendukung perjalanan kariermu</h2>
        </section>
    </div>
  )
}
