'use client'
import React, { useState } from 'react'
import KursusCard from '../components/kursusCard'
import FilterSidebar from '@/shared/container/Filters/FilterSidebar'
import { KursusInfoDummy } from '@/shared/models/static/WebinarInfoDummy'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function KursusContainer() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    
    const itemsPerPage = 6

    // Extract unique countries dari data
    const uniqueCountries = Array.from(new Set(KursusInfoDummy.map(item => item.location)))
    
    // Filter options untuk sidebar - berdasarkan negara
    const filterOptions = [
        { label: 'Semua Negara', value: 'all' },
        ...uniqueCountries.map(country => ({
            label: country,
            value: country.toLowerCase()
        }))
    ]

    // Filter logic - filter berdasarkan negara
    const filteredData = activeFilter === 'all' 
        ? KursusInfoDummy 
        : KursusInfoDummy.filter(item => item.location.toLowerCase() === activeFilter)

    // Pagination
    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    const handleFilterChange = (value: string) => {
        setActiveFilter(value)
        setCurrentPage(1)
    }

    return (
        <div className='px-20 py-14 flex flex-col gap-8 w-full'>
            {/* Header Section */}
            <div className='text-center'>
                <h1 className='text-4xl font-bold mb-2'>Mulai Belajar dengan E-Course</h1>
                <p className='text-gray-600'>Bangun skill baru dan buka lebih banyak peluang untuk masa depanmu</p>
            </div>

            {/* Main Content */}
            <div className='flex gap-8'>
                {/* Sidebar Filter */}
                <FilterSidebar
                    title="Pilihan Pembelajaran"
                    options={filterOptions}
                    activeFilter={activeFilter}
                    onFilterChange={handleFilterChange}
                />

                {/* Content Grid */}
                <div className='flex-1 flex flex-col gap-8'>
                    {paginatedData.length > 0 ? (
                        <>
                            <div className='grid grid-cols-2 gap-6'>
                                {paginatedData.map((item, index) => (
                                    <KursusCard
                                        key={index}
                                        title={item.title}
                                        location={item.location}
                                        price={item.price}
                                    />
                                ))}
                            </div>

                            {/* Pagination */}
                            {totalPages > 1 && (
                                <div className='flex items-center justify-center gap-2 mt-8'>
                                    <button
                                        onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                                        disabled={currentPage === 1}
                                        className='p-2 rounded-lg border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
                                    >
                                        <ChevronLeft size={20} />
                                    </button>

                                    <span className='px-4 py-2'>{currentPage}</span>
                                    <span className='text-gray-500'>dari</span>
                                    <span className='px-4 py-2'>{totalPages}</span>

                                    <button
                                        onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                                        disabled={currentPage === totalPages}
                                        className='p-2 rounded-lg bg-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700'
                                    >
                                        <ChevronRight size={20} />
                                    </button>
                                </div>
                            )}
                        </>
                    ) : (
                        <div className='text-center py-20 text-gray-500'>
                            Tidak ada kursus yang ditemukan
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}