import Link from 'next/link'
import React from 'react'

export default function authButton() {
  return (
    <Link href="/login">
      <button className='bg-gradient-to-r from-Kzen-primary to-Kzen-secondary hover:opacity-70 px-4 py-2 rounded-full'>
        Masuk
      </button>
    </Link>
  )
}
