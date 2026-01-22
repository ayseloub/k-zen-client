import Link from 'next/link'
import React from 'react'

export default function authButton() {
  return (
    <Link href="/login">
      <button className='bg-Kzen-primary px-4 py-2 rounded-full'>
        Masuk
      </button>
    </Link>
  )
}
