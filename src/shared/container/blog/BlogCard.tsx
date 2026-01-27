import React from 'react';
import Image, { StaticImageData } from 'next/image';
import { Icon } from '@iconify/react';

interface BlogCardProps {
  title: string;
  description?: string;
  date: string;
  image?: StaticImageData | string; 
  featured?: boolean;
}

export default function BlogCard({ 
  title, 
  description, 
  date, 
  image, 
  featured = false 
}: BlogCardProps) {
  if (featured) {
    return (
      <div className='rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all cursor-pointer group'>
        {image && ( 
          <div className='relative h-96'>
            <Image
              src={image}
              alt={title}
              fill
              className='object-cover group-hover:scale-105 transition-all duration-300'
            />
          </div>
        )}
        <div className='p-8 bg-white'>
          <h3 className='text-2xl font-semibold mb-3 text-Kzen-dark group-hover:text-Kzen-primary transition-colors'>
            {title}
          </h3>
          {description && (
            <p className='text-base text-Kzen-neutral/80 mb-4 line-clamp-2'>
              {description}
            </p>
          )}
          <div className='flex items-center gap-2 text-sm text-Kzen-neutral/70'>
            <Icon icon="mdi:calendar-blank" width={16} />
            <span>{date}</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='flex gap-4 p-4 rounded-2xl hover:bg-gray-50 transition-all cursor-pointer group border border-transparent hover:border-Kzen-primary/20'>
      {image && ( 
        <div className='relative w-32 h-24 flex-shrink-0 rounded-xl overflow-hidden'>
          <Image
            src={image}
            alt={title}
            fill
            className='object-cover group-hover:scale-105 transition-all duration-300'
          />
        </div>
      )}
      <div className='flex-1'>
        <h4 className='text-base font-semibold mb-2 text-Kzen-dark group-hover:text-Kzen-primary transition-colors line-clamp-2'>
          {title}
        </h4>
        <div className='flex items-center gap-2 text-sm text-Kzen-neutral/70'>
          <Icon icon="mdi:calendar-blank" width={14} />
          <span>{date}</span>
        </div>
      </div>
    </div>
  );
}