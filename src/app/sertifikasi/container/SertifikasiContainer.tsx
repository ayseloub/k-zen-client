'use client'
import React, { useState } from 'react'
import SertifikasiCard from '../components/sertifikasiCard'
import FilterSidebar from '@/shared/container/Filters/FilterSidebar'
import { SertifikasiInfoDummy } from '@/shared/models/static/WebinarInfoDummy'
import { ChevronLeft, ChevronRight, Search } from 'lucide-react'

export default function SertifikasiContainer() {
    const [activeFilter, setActiveFilter] = useState('all')
    const [currentPage, setCurrentPage] = useState(1)
    const [searchQuery, setSearchQuery] = useState('')
    const [selectedCountry, setSelectedCountry] = useState('Negara')
    
    const itemsPerPage = 6

    const filterOptions = [
        { label: 'Semua Sertifikasi', value: 'all' },
        { label: 'Sertifikasi Bahasa', value: 'bahasa' },
        { label: 'Sertifikasi Keahlian', value: 'keahlian' },
    ]

    const uniqueCountries = ['Negara', ...Array.from(new Set(SertifikasiInfoDummy.map(item => item.location)))]

    const filteredData = SertifikasiInfoDummy.filter(item => {
        const isBahasa = item.title.toLowerCase().includes('bahasa')
        const matchCategory = activeFilter === 'all' || 
                            (activeFilter === 'bahasa' && isBahasa) ||
                            (activeFilter === 'keahlian' && !isBahasa)
        
        const matchSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase())
        const matchCountry = selectedCountry === 'Negara' || item.location === selectedCountry
        
        return matchCategory && matchSearch && matchCountry
    })

    const totalPages = Math.ceil(filteredData.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage)

    const handleFilterChange = (value: string) => {
        setActiveFilter(value)
        setCurrentPage(1)
    }

    return (
        <div className='flex flex-col px-20 py-12 gap-8 w-full'>
            <div className='flex items-center justify-between'>
                <div>
                    <h1 className='text-4xl font-bold mb-2'>Lebih Ahli Dengan Sertifikasi</h1>
                    <p className='text-gray-600'>Temukan sertifikasi terakreditasi global</p>
                </div>

                <div className='flex gap-4'>
                    <div className='relative'>
                        <Search className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400' size={20} />
                        <input
                            type="text"
                            placeholder="Cari Posisi"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className='pl-10 pr-4 py-2 border border-gray-300 rounded-full w-[300px] focus:outline-none focus:ring-2 focus:ring-blue-500'
                        />
                    </div>

                    {/* Country Dropdown */}
                    <select
                        value={selectedCountry}
                        onChange={(e) => setSelectedCountry(e.target.value)}
                        className='px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500'
                    >
                        {uniqueCountries.map((country) => (
                            <option key={country} value={country}>
                                {country}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            {/* Main Content */}
            <div className='flex gap-8'>
                {/* Sidebar Filter */}
                <FilterSidebar
                    title="Tipe Sertifikasi"
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
                                    <SertifikasiCard
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
                            Tidak ada sertifikasi yang ditemukan
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}