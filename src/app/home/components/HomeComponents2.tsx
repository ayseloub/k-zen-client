'use client'
import React from 'react'
import Image from 'next/image'
import Hero2 from '@/shared/assets/images/Hero2.svg'

export default function HomeComponents2() {
  return (
    <div className='space-y-10 text-center'>
      <h1 className='font-semibold text-6xl'>Kenapa K-Zen Pilihan Karir Terbaikmu</h1>
      <h2 className='font-light text-Kzen-neutral text-3xl'>Temukan Layanan Terbaik dengan Kebutuhan Karir Impianmu</h2>
      <Image
        src={Hero2}
        alt='hero'
        width={1000}
        className='mx-auto'
      />
    </div>
  )
}
