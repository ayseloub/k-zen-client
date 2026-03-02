'use client'
import React, { useState } from 'react'
import WebinarCard from '../components/WebinarCard'
import { WebinarInfoDummy } from '@/shared/models/static/WebinarInfoDummy'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function WebinarContainer() {
    const [activeFilter, setActiveFilter] = useState<'all' | 'studi' | 'karir'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9

    const filteredWebinars = activeFilter === 'all' 
        ? WebinarInfoDummy 
        : WebinarInfoDummy.filter(webinar => webinar.category === activeFilter)

    const totalPages = Math.ceil(filteredWebinars.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedWebinars = filteredWebinars.slice(startIndex, startIndex + itemsPerPage)

    const handleFilterChange = (filter: 'all' | 'studi' | 'karir') => {
        setActiveFilter(filter)
        setCurrentPage(1)
    }

    return (
        <div className='flex px-36 py-20 gap-24 w-full'>
            <aside className='w-[240px] flex flex-col gap-4'>
                <h2 className='text-2xl font-bold mb-4'>Tipe Webinar</h2>
                
                <button
                    onClick={() => handleFilterChange('all')}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === 'all' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Semua Webinar
                </button>

                <button
                    onClick={() => handleFilterChange('studi')}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === 'studi' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Webinar Studi Lanjut
                </button>

                <button
                    onClick={() => handleFilterChange('karir')}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === 'karir' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Webinar Karier Profesional
                </button>
            </aside>

            <div className='flex-1 flex flex-col gap-8'>
                <div className='grid grid-cols-2 gap-20'>
                    {paginatedWebinars.map((webinar, index) => (
                        <WebinarCard 
                            key={index}
                            title={webinar.title}
                            description={webinar.description}
                            date={webinar.date}
                            time={webinar.time}
                            price={webinar.price}
                            image={webinar.image}
                            category={webinar.category}
                        />
                    ))}
                </div>

                {totalPages > 1 && (
                    <div className='flex items-center justify-center gap-2 mt-8'>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className='p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
                        >
                            <ChevronLeft size={20} />
                        </button>

                        <span className='px-4 py-2'>
                            {currentPage}
                        </span>
                        <span className='text-gray-500'>dari</span>
                        <span className='px-4 py-2'>
                            {totalPages}
                        </span>

                        <button
                            onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                            disabled={currentPage === totalPages}
                            className='p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700'
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}