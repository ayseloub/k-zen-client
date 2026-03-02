import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Calendar } from 'lucide-react'

interface IWebinarCard {
    title: string
    description: string
    date: string
    time: string
    price: string
    image: StaticImageData | string
    category: string
}

export default function WebinarCard({ title, description, date, image, price }: IWebinarCard) {
    return (
        <div className='flex flex-col gap-3 bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow'>
            <div className='relative w-full h-[240px]'>
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    className='object-cover rounded-lg'
                />

                <div className='absolute bottom-0 right-0 bg-[linear-gradient(to_right,#08456D,#0068AD_40%,#2D82BB_60%,#549AC8_80%,#ABCDE4_90%,#cee3f0)] text-white px-4 py-2 rounded-tl-lg rounded-br-lg text-lg font-medium'>
                    Rp{price}
                </div>
            </div>
            
            <div className='px-4 pb-4 flex flex-col gap-2'>
                <h3 className='text-lg font-semibold line-clamp-2'>
                    {title}
                </h3>
                
                <div className='flex items-center gap-2 text-gray-500 text-sm'>
                    <Calendar size={16} />
                    <span>{date}</span>
                </div>

                <p className='text-sm text-gray-600 line-clamp-2'>
                    {description}
                </p>
            </div>
        </div>
    )
}