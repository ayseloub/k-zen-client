'use client'
import React from 'react'
import Image from 'next/image'
import Hero from '@/shared/assets/images/LPBg.png'
import Navbar from '@/shared/container/navbar/navbar'
import img from '@/shared/assets/images/lp3hero.png'
import { LPStatisticList3 } from '@/shared/models/static/statisticList'
import CountUp from 'react-countup';

export default function KPComponent1() {
  return (
    <div className='relative pt-3 w-full h-fit'>
        <Image
            src={Hero}
            alt='hero'
            fill
            className='object-cover'
        />
        <div className='relative z-20 w-full h-fit'>
            <Navbar/>
            <div className='mx-auto text-Kzen-light w-full flex gap-36 justify-center items-center'>
                <div className=''>
                    <h1 className='text-4xl font-semibold'>
                        Mulai Perjalanan Karier<br/> Masa Depanmu
                    </h1>
                    <p className='text-2xl font-extralight opacity-70 mt-4'>
                        Kuasai bahasa dan persiapkan<br/> skill profesional yang diakui dunia
                    </p>
                    <div className='flex gap-10'>
                        {LPStatisticList3.map((statistic, index) => (
                            <div 
                                key={index} 
                                className={`mt-8 space-y-2 ${index > 0 ? 'pl-10 border-l-[1px] border-white/30' : ''}`}
                            >
                                <h2 className='text-2xl font-semibold'>
                                    <CountUp end={statistic.value} duration={2} /> {statistic.unit}
                                </h2>
                                <p className='text-xl font-extralight'>{statistic.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <Image
                    src={img}
                    alt='hero'
                    width={500}
                    className=''
                />
            </div>
        </div>
    </div>
  )
}