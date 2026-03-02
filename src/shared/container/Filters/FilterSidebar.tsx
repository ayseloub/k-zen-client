import React from 'react'

interface IFilterOption {
    label: string
    value: string
}

interface IFilterSidebarProps {
    title: string
    options: IFilterOption[]
    activeFilter: string
    onFilterChange: (value: string) => void
}

export default function FilterSidebar({ title, options, activeFilter, onFilterChange }: IFilterSidebarProps) {
    return (
        <aside className='w-[280px] flex flex-col gap-4'>
            <h2 className='text-2xl font-bold mb-4'>{title}</h2>
            
            {options.map((option) => (
                <button
                    key={option.value}
                    onClick={() => onFilterChange(option.value)}
                    className={`px-6 py-3 rounded-lg text-left font-medium transition-colors ${
                        activeFilter === option.value
                            ? 'bg-blue-600 text-white' 
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                >
                    {option.label}
                </button>
            ))}
        </aside>
    )
}