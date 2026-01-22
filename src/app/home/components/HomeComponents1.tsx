'use client'
import React from 'react'
import Image from 'next/image'
import Hero1 from '@/shared/assets/images/hero1.png'
import ConsultationBox from '@/shared/assets/components/consultationBox'

export default function HomeComponents1() {
  return (
    <div className='flex gap-40 items-center py-12 px-20 justify-center'>
        <section>
         <h1 className='text-Kzen-dark font-semibold text-4xl'>
            Langkah Pasti Menuju    
         </h1>
         <h1 className='text-Kzen-dark font-semibold text-4xl flex gap-2'><p className='text-Kzen-primary'>Studi & Karir</p> Internasional</h1>
         <p className='font-light text-2xl mt-2 flex gap-2'>We Guide You <p className='text-Kzen-primary'>#FromZerotoGlobal</p></p>
         <ConsultationBox />
        </section>
        <section>
          <Image
            src={Hero1}
            alt="Hero1"
            width={550}
          />
        </section>
    </div>
  )
}
