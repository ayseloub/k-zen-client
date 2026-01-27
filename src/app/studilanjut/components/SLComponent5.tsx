import React from 'react'
import Image from 'next/image'
import img from '@/shared/assets/images/sertifikasiinggris.png'
import { EnglishCertification } from '@/shared/models/static/CertificationValue'
import { Icon } from '@iconify/react'

export default function SLComponent5() {
  return (
    <div className='overflow-visible w-full px-20 py-10'>
        <section className='py-10 overflow-visible'>
            <h1 className='text-9xl relative left-[-200px] font-bold bg-gradient-to-r from-[#9100AE0F] from-6% via-[#878DFFA3] via-64% to-[#668AFF80] to-50% bg-clip-text text-transparent opacity-20 leading-tight'>
                Program Unggulan
            </h1>
            <h1 className='text-9xl relative right-[-550px] font-bold bg-[radial-gradient(ellipse_at_left,#0099FF_0%,#3366FFE0_50%,#2B388F_100%)] bg-clip-text text-transparent opacity-20 leading-tight'>
                Studi Lanjut By K-Zen
            </h1>
        </section>
        
        <section className='flex justify-center items-center gap-20'>
            <div className='space-y-3'>
                <p className='text-xl text-Kzen-neutral/90 font-extralight'>
                    Sertifikasi K-Zen
                </p>
                <h1 className='text-5xl font-semibold'>
                    Sertifikasi <span className='text-Kzen-primary'>Bahasa<br/> Inggris</span>
                </h1>
                <p className='text-2xl font-extralight text-Kzen-neutral/90'>
                    Tingkatkan kompetensimu di mata dunia
                </p>
            </div>

            <div className='relative w-[45vw] rounded-3xl overflow-hidden'>
                <Image
                    src={img}
                    alt='hero'
                    fill
                    className='object-cover'
                />
                
                <div className='relative z-10 h-full flex flex-col justify-center p-12 text-white'>
                    <h2 className='text-2xl font-bold mb-2'>
                        Sertifikasi Bahasa<br/> Inggris
                    </h2>
                    <p className=' font-light mb-6'>
                        Dapatkan harga spesial dengan<br/> penawaran terbatas!
                    </p>
                    
                    <div className='space-y-3 mb-6'>
                        {EnglishCertification.map((english, index) => (
                            <div key={index} className='flex items-center gap-3'>
                                <Icon 
                                    icon="lets-icons:check-fill" 
                                    width={24} 
                                    height={24}
                                    className="text-white"
                                />
                                <span className='text-lg'>{english.value}</span>
                            </div>
                        ))}
                    </div>
                    
                    <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-Kzen-light mx-auto px-8 py-3 rounded-full font-semibold hover:bg-white/90 transition-all w-fit'>
                        Ambil Sertifikasi
                    </button>
                </div>
            </div>
        </section>
    </div>
  )
}