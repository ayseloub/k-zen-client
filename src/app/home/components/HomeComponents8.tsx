'use client'

import React, { useState } from 'react'
import { FAQList } from '@/shared/models/static/FAQList'
import { Icon } from '@iconify/react'

export default function HomeComponents8() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className='my-10 space-y-10'>
        <h1 className='text-4xl font-medium text-center'>Pertanyaan yang Sering Diajukan</h1>
        <div className='space-y-5'>
            {FAQList.map((item, index) => (
                <div 
                    key={index} 
                    className='border rounded-xl shadow-xl border-Kzen-neutral/30 p-5 w-1/2 mx-auto cursor-pointer transition-all'
                    onClick={() => toggleFAQ(index)}
                >
                    <div className='flex justify-between items-center'>
                        <h2 className={`text-xl font-medium ${openIndex === index ? 'text-Kzen-primary' : 'text-black'}`}>
                            {item.question}
                        </h2>
                        <Icon 
                            icon="iconamoon:arrow-up-2-duotone" 
                            width={24} 
                            className={`transition-transform duration-300 ${
                                openIndex === index ? 'rotate-0 text-Kzen-primary' : 'rotate-180'
                            }`}
                        />
                    </div>
                    
                    {openIndex === index && (
                        <div className='mt-4 text-Kzen-neutral space-y-3 animate-fade-in'>
                            {item.answer.split('\n').map((paragraph, i) => (
                                <p key={i}>{paragraph}</p>
                            ))}
                        </div>
                    )}
                </div>
            ))}
        </div>
        <button className='p-5 block mx-auto text-lg border border-Kzen-secondary py-3 px-10 text-Kzen-secondary hover:bg-Kzen-primary hover:text-Kzen-light rounded-full transition-colors'> 
            Lihat Lainnya
        </button>
    </div>
  )
}