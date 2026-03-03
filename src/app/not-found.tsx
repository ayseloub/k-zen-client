import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import error404 from '@/shared/assets/images/errorHandling/404.png'
import Navbar from '@/shared/container/navbar/navbar'
import Footer from '@/shared/container/footer/footer'

export default function NotFound() {
    return (
        <div className='min-h-screen flex flex-col'>
            <Navbar />
            
            <div className='flex-1 flex flex-col items-center justify-center px-4'>
                <div className='max-w-2xl text-center flex flex-col items-center gap-6'>
                    <div className='relative w-[400px] h-[300px]'>
                        <Image 
                            src={error404}
                            alt="404 Error"
                            fill
                            className='object-contain'
                        />
                    </div>

                    <h1 className='text-3xl font-bold text-gray-900'>
                        Maaf, Halaman Tidak Ditemukan
                    </h1>
                    <p className='text-gray-600'>
                        Maaf, halaman yang kamu cari tidak dapat ditemukan. Silakan kembali ke beranda.
                    </p>

                    <Link href="/">
                        <button className='bg-blue-600 text-white px-8 py-3 rounded-full font-medium hover:bg-blue-700 transition-colors'>
                            Kembali Ke Beranda
                        </button>
                    </Link>
                </div>
            </div>

            <Footer />
        </div>
    )
}