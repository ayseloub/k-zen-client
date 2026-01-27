import React from 'react';
import { Icon } from '@iconify/react';
import Image from 'next/image';
import { StaticImageData } from 'next/image';

interface IWebinarCard {
  title: string;
  description: string;
  date: string;
  price: string;
  image?: string | StaticImageData;
}

export default function WebinarCard({ title, description, date, price, image }: IWebinarCard) {
  return (
    <div className="group relative bg-transparent rounded-2xl hover:p-6 overflow-hidden hover:border-kzen-primary transition-all duration-300 hover:shadow-xl">
      <div className="relative h-56 w-full rounded-2xl overflow-hidden">
        <Image
          src={image || '/placeholder-webinar.jpg'}
          alt={title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        
        <div className="absolute bottom-4 right-4 bg-white/40 backdrop-blur-sm px-4 py-2 rounded-full">
          <p className="text-sm font-semibold text-Kzen-light">Rp. {price}</p>
        </div>
      </div>

      <div className="py-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-3 line-clamp-2 min-h-[56px]">
          {title}
        </h3>

        <div className="flex items-center opacity-50 gap-2 mb-3">
          <Icon icon="mdi:calendar-outline" className="text-kzen-primary" width={20} />
          <p className="text-sm text-gray-600">{date}</p>
        </div>

        <p className="text-sm text-gray-600 opacity-50 line-clamp-3 mb-4">
          {description}
        </p>
      </div>
    </div>
  );
}