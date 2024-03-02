import Link from 'next/link'
import React from 'react'

export default function Footer() {

    let date = new Date()
    let year = date.getFullYear()

    return (
        <>
            <footer className='flex flex-row justify-around items-center w-full absolute bottom-0 left-0 p-2 bg-white text-bgColor'>
                <p>Copyright<sup>&copy;</sup>{year} <Link href={'https://rockaidev.vercel.app'} className='font-bold text-blue-500'>Rockai Dev</Link> | All Rights Reserved.</p>
                <p><Link className='px-2 font-semibold' href="/">Teams {`&`} conditions</Link> <Link className='px-2 font-semibold' href="/">Privacy Policy</Link></p>
            </footer>
        </>
    )
}
