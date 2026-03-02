import React from 'react'
import { MapPin } from 'lucide-react'

interface ISertifikasiCard {
    title: string
    location: string
    price: string
}

export default function SertifikasiCard({ title, location, price }: ISertifikasiCard) {
    return (
        <div className='border border-gray-200 rounded-xl p-6 hover:shadow-lg transition-shadow flex flex-col gap-4'>
            {/* Title */}
            <h3 className='text-lg font-semibold text-gray-900'>
                {title}
            </h3>

            {/* Location */}
            <div className='flex items-center gap-2 text-gray-600 text-sm'>
                <MapPin size={16} />
                <span>{location}</span>
            </div>

             <div className='w-full border-t-2 border-Kzen-neutral/50'></div>

            {/* Price and Action */}
            <div className='flex items-center justify-between mt-auto'>
                <span className='text-xl font-bold text-Kzen-primary'>
                    {price}
                </span>
                <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary text-white px-4 py-2 rounded-full text-sm font-medium hover:bg-blue-700 transition-colors'>
                    Selengkapnya
                </button>
            </div>
        </div>
    )
}