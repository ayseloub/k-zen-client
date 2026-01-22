import React from 'react'
import Marquee from "react-fast-marquee";
import Image from 'next/image'
import img1 from '@/shared/assets/images/sponsors_logo/logo1.svg'
import img2 from '@/shared/assets/images/sponsors_logo/logo2.svg'
import img3 from '@/shared/assets/images/sponsors_logo/logo3.svg'
import img4 from '@/shared/assets/images/sponsors_logo/logo4.svg'
import img5 from '@/shared/assets/images/sponsors_logo/logo5.svg'
import img6 from '@/shared/assets/images/sponsors_logo/logo6.svg'
import img7 from '@/shared/assets/images/sponsors_logo/logo7.svg'


export default function HomeCommponents3() {
  return (
    <div className='flex mt-10 mx-10 items-center space-x-10'>
        <section className='w-1/2 space-y-5 h-max-50'>
          <Marquee gradient={false} speed={80} direction='left'>
            <div className='flex gap-10'>
              <Image src={img1} alt='sponsor logo' width={85} />
              <Image src={img2} alt='sponsor logo' width={85} />
              <Image src={img3} alt='sponsor logo' width={85} />
              <Image src={img4} alt='sponsor logo' width={85} />
              <Image src={img5} alt='sponsor logo' width={85} />
              <Image src={img6} alt='sponsor logo' width={85} />
              <Image src={img7} alt='sponsor logo' className='mr-10' width={85} />
            </div>
          </Marquee>
          <Marquee gradient={false} speed={80} direction='right'>
            <div className='flex gap-10'>
              <Image src={img1} alt='sponsor logo' width={85} />
              <Image src={img2} alt='sponsor logo' width={85} />
              <Image src={img3} alt='sponsor logo' width={85} />
              <Image src={img4} alt='sponsor logo' width={85} />
              <Image src={img5} alt='sponsor logo' width={85} />
              <Image src={img6} alt='sponsor logo' width={85} />
              <Image src={img7} alt='sponsor logo' className='mr-10' width={85} />
            </div>
          </Marquee>
          
        </section>
        <section className='text-left w-1/2'>
          <h1 className='text-Kzen-primary text-5xl font-semibold'>Dipercaya 20+ mitra</h1>
          <h2 className='text-4xl font-light text-Kzen-neutral'>untuk mendukung perjalanan kariermu</h2>
        </section>
    </div>
  )
}
