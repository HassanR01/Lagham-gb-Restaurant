import Link from 'next/link'
import React from 'react'

export default function Footer() {

    let date = new Date()
    let year = date.getFullYear()

    return (
        <>
            <footer className='flex flex-wrap justify-around items-center w-full p-2 bg-gray-200 text-bgColor'>
                <p className='text-sm mb-1'>Copyright<sup>&copy;</sup>{year} <Link href={'https://rockaidev.vercel.app'} className='font-bold text-blue-500'>Rockai Dev</Link> | All Rights Reserved.</p>
                <p className='text-sm'><Link className='px-2 font-semibold' href="/">Teams {`&`} conditions</Link> <Link className='px-2 font-semibold' href="/">Privacy Policy</Link></p>
            </footer>
        </>
    )
}
