import React from 'react'
import Image, { StaticImageData } from 'next/image'
import { Calendar } from 'lucide-react'

interface IBlogCard {
    title: string
    description: string
    date: string
    image: StaticImageData | string
    category: string
}

export default function ArtikelCard({ title, description, date, image }: IBlogCard) {
    return (
        <div className='flex flex-col gap-3'>
            <div className='relative w-full h-[200px] rounded-2xl overflow-hidden'>
                <Image 
                    src={image} 
                    alt={title}
                    fill
                    className='object-cover'
                />
            </div>
            <h3 className='text-lg font-semibold line-clamp-2'>
                {title}
            </h3>
            <div className='flex items-center gap-2 text-gray-500 text-sm'>
                <Calendar size={16} />
                <span>{date}</span>
            </div>
        </div>
    )
}