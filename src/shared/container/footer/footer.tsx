import React from 'react'
import Image from 'next/image'
import logo from '@/shared/assets/images/Footer/logo.png'
import { ContactList, ContactListWithValue } from '@/shared/models/static/ContactList'
import { Icon } from "@iconify/react";

interface IFooterProps {
    value: string;
    href?: string;
}

const FooterProps: IFooterProps[] = [
    {
        value: "Tentang Kami",
    },
    {
        value: "Kebijakan Privasi",
    },
    {
        value: "Syarat dan Ketentuan",
    }
]

const FooterProps2: IFooterProps[] = [
    {
        value: "FAQ",
    },
    {
        value: "Kontak Kami",
    },
]

export default function Footer() {
    const alamat = "Sales Business Center Jl. Gangga No.10, Kec. Wagir, Kota Malang, Jawa Timur 65148";

  return (
    <div className='my-10 bg-gradient-to-r space-y-10 mx-20 text-Kzen-light from-Kzen-primary from-50% to-Kzen-secondary px-8 py-10 rounded-3xl'>
        <div className='grid grid-cols-4 justify-between gap-20'>
            <div className='flex flex-col gap-6'>
                <div className='flex flex-col gap-4'>
                    <Image
                        src={logo}
                        alt="Footer Logo"
                        width={150}
                    />
                    <p className='text-lg max-w-md'>{alamat}</p>
                </div>

                <div className='flex gap-2'>
                    {ContactList.map((contact, index) => (
                        <a 
                            key={index}
                            href={contact.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className='hover:opacity-80 transition-opacity bg-white rounded-full p-2'
                        >
                            <Icon icon={contact.icon} width={30} height={30} className='text-Kzen-dark/90' />
                        </a>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='font-semibold text-2xl'>
                    Hubungi Kami
                </p>
                <div className='flex flex-col gap-3'>
                    {ContactListWithValue.map((contact, index) => (
                        <div key={index} className='flex items-center gap-2'>
                            <Icon icon={contact.icon} width={30} height={30} />
                            <span>{contact.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='font-semibold text-2xl'>Informasi</p>
                <div className='flex flex-col gap-3'>
                    {FooterProps.map((item, index) => (
                        <a key={index} href={item.href} className='hover:text-Kzen-secondary transition-colors'>
                            {item.value}
                        </a>
                    ))}
                </div>
            </div>

            <div className='flex flex-col gap-4'>
                <p className='font-semibold text-2xl'>Informasi</p>
                <div className='flex flex-col gap-3'>
                    {FooterProps2.map((item, index) => (
                        <a key={index} href={item.href} className='hover:text-Kzen-secondary transition-colors'>
                            {item.value}
                        </a>
                    ))}
                </div>
            </div>
        </div>

        <div className='w-full border-t-2 border-Kzen-light'></div>

        <p className='font-extralight text-lg text-center'>PT Bakti Bina Karya © 2026. Lorem Ipsum Dolor sit Amet</p>

    </div>
  )
}