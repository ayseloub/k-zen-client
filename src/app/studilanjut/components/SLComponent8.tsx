import React from 'react'
import Content from '@/shared/container/testimony/TestimonyContainer'

export default function SLComponent8() {
  return (
    <div className='overflow-visible w-full px-20 py-10'>
        <section className='py-10 overflow-visible'>
            <h1 className='text-9xl relative left-[-200px] font-bold bg-gradient-to-r from-[#9100AE0F] from-6% via-[#878DFFA3] via-64% to-[#668AFF80] to-50% bg-clip-text text-transparent opacity-20 leading-tight'>
                Apa Kata KZeners Tentang
            </h1>
            <h1 className='text-9xl relative right-[-550px] font-bold bg-[radial-gradient(ellipse_at_left,#0099FF_0%,#3366FFE0_50%,#2B388F_100%)] bg-clip-text text-transparent opacity-20 leading-tight'>
                Studi Lanjut By K-Zen
            </h1>
        </section>
        <Content />
    </div>
  )
}
