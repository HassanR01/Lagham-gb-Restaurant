import Link from 'next/link'
import React from 'react'

export default function Header() {
    return (
        <header className='border-b border-yellow-300 rounded-xl pl-3 pr-3 mb-4 flex justify-between items-center'>
            <h1 className='text-3xl font-bold text-red-500'>Lagham-<span className='text-yellow-300'>GB</span></h1>
            <nav>
                <ul className='flex p-2 text-xl text-gray-50'>
                    <li className='ml-4' ><Link href={'/'}>Home</Link></li>
                    <li className='ml-4' ><Link href={'/basket'}>Basket</Link></li>
                    <li className='ml-4' ><Link href={'/profile'}>Profile</Link></li>
                    <li className='ml-4' ><Link href={'/Dashboard'}>Dashboard</Link></li>
                </ul>
            </nav>
        </header>
    )
}
