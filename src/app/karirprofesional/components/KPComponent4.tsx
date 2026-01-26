import React from 'react'
import Image from 'next/image'
import Hero from '@/shared/assets/images/workJourney.png'
import { WorkJourneyList1, WorkJourneyList2 } from '@/shared/models/static/JourneyList'

export default function KPComponent4() {
  return (
    <div className='text-center mt-5 space-y-20 pb-20'>
        <h1 className='text-4xl font-semibold'>
            <span className='text-Kzen-primary'>Fast-Track</span> Perjalanan Studi Lanjut Kamu
        </h1>
        
        <section className='flex items-center gap-20 justify-center'>
            <Image
                src={Hero}
                alt='hero'
                width={600}
            />
            <div>
                {WorkJourneyList1.map((journey, index) => (
                    <div key={index} className='mb-5 text-left border-l-4 p-5 border-Kzen-primary'>
                        <h2 className='text-2xl text-Kzen-primary font-semibold'>{journey.title}</h2>
                        <p className='text-lg font-extralight text-Kzen-neutral/90'>{journey.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        <section className='px-20'>
            <div className='flex items-center mt-36 justify-between relative'>
                <div className='absolute top-7 left-7 right-7 h-0 border-t-2 border-dashed border-Kzen-primary/40'></div>
                
                {WorkJourneyList2.map((journey, index) => (
                    <div key={index} className='relative flex flex-col items-center z-10'>
                        <div className={`absolute ${index % 2 === 0 ? 'bottom-16' : 'top-16'} text-center w-48`}>
                            <h3 className='text-xl font-semibold text-Kzen-dark mb-1'>
                                {journey.title}
                            </h3>
                            <p className='text-sm font-light text-Kzen-neutral/80'>
                                {journey.desc}
                            </p>
                        </div>

                        <div className='w-14 h-14 rounded-full border-[1px] border-Kzen-primary bg-white flex items-center justify-center'>
                            <div className='w-10 h-10 rounded-full border-[1px] border-Kzen-primary bg-white flex items-center justify-center'>
                                <div className='w-5 h-5 rounded-full bg-Kzen-primary'></div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    </div>
  )
}