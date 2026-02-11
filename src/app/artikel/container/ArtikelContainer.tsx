'use client'
import React, { useState } from 'react'
import BlogCard from '../components/ArtikelCard'
import { BlogInfoDummy } from '@/shared/models/static/WebinarInfoDummy'
import { ChevronLeft, ChevronRight } from 'lucide-react'

export default function ArtikelContainer() {
    const [activeFilter, setActiveFilter] = useState<'all' | 'studi' | 'karir'>('all')
    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 9

    // Filter blogs based on active filter
    const filteredBlogs = activeFilter === 'all' 
        ? BlogInfoDummy 
        : BlogInfoDummy.filter(blog => blog.category === activeFilter)

    // Pagination
    const totalPages = Math.ceil(filteredBlogs.length / itemsPerPage)
    const startIndex = (currentPage - 1) * itemsPerPage
    const paginatedBlogs = filteredBlogs.slice(startIndex, startIndex + itemsPerPage)

    const handleFilterChange = (filter: 'all' | 'studi' | 'karir') => {
        setActiveFilter(filter)
        setCurrentPage(1) // Reset to page 1 when filter changes
    }

    return (
        <div className='flex gap-8 p-20 w-full'>
            {/* Sidebar Filter */}
            <aside className='w-[240px] flex flex-col gap-4'>
                <h2 className='text-4xl font-bold mb-4'>Jelajahi Blog Pilihan</h2>
                
                <button
                    onClick={() => handleFilterChange('all')}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === 'all' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Semua Blog
                </button>

                <button
                    onClick={() => handleFilterChange('studi')}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === 'studi' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Blog Studi Lanjut
                </button>

                <button
                    onClick={() => handleFilterChange('karir')}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === 'karir' 
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    Blog Karier Profesional
                </button>
            </aside>

            {/* Main Content */}
            <div className='flex-1 flex flex-col gap-8 p-10'>
                {/* Blog Grid */}
                <div className='grid grid-cols-3 gap-10'>
                    {paginatedBlogs.map((blog, index) => (
                        <BlogCard 
                            key={index}
                            title={blog.title}
                            description={blog.description}
                            date={blog.date}
                            image={blog.image}
                            category={blog.category}
                        />
                    ))}
                </div>

                {/* Pagination */}
                {totalPages > 1 && (
                    <div className='flex items-center justify-center gap-2 mt-8'>
                        <button
                            onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                            disabled={currentPage === 1}
                            className='p-2 rounded-full border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100'
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
                            className='p-2 bg-blue-600 rounded-full text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700'
                        >
                            <ChevronRight size={20} />
                        </button>
                    </div>
                )}
            </div>
        </div>
    )
}