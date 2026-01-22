import React from 'react'
import Image from 'next/image'
import background from '@/shared/assets/images/homesection10.png'
import { ContactListWithHour } from '@/shared/models/static/ContactList'

export default function HomeComponents10() {
  return (
    <div className='relative p-10 w-full h-fit'>
        <Image
            src={background}
            alt="Background"
            fill
            className='object-cover'
        />
        <div className=' justify-between px-10 flex'>
            <div className='relative z-10 flex flex-col h-fit space-y-2 mx-20'>
                <h1 className='text-2xl font-light text-Kzen-dark/20'>
                    Info Kontak
                </h1>
                <p className='text-4xl font-semibold text-Kzen-dark'>
                    <span className='text-Kzen-primary'>Kami hadir</span> untuk mendukung
                </p>
                <p className='text-4xl font-semibold text-Kzen-dark'>langkah perjalananmu</p>
            </div>
            <div className='flex'>
                {ContactListWithHour.map((contact, index) => (
                    <div key={index} className='relative space-y-5 z-10 flex flex-col mx-20'>
                        <h2 className='text-Kzen-dark text-2xl font-semibold'>{contact.title}</h2>
                        <div className='border-t-4 border-Kzen-dark w-1/4'></div>
                        <a 
                            href={contact.value} 
                            className='text-2xl font-medium text-Kzen-dark hover:text-Kzen-secondary transition-colors'
                        >
                            {contact.value}
                        </a>
                        <p className='text-xl opacity-50 font-semibold'>Jam Operasional:</p>
                        <p className='text-lg w-3/4 font-extralight text-Kzen-dark/70'>{contact.hour}</p>
                    </div>
                ))} 
            </div>
        </div>
    </div>
  )
}