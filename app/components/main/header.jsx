'use client'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import bgImage from '../../../public/bg.png'
import Image from 'next/image'
import basketIcon from '../../../public/basket.svg'
import logo from '../../../public/logo.png'
import { signIn, useSession } from 'next-auth/react'

export default function Header() {
    const [cart, setCart] = useState([])
    const { status, data: session } = useSession()

    useEffect(() => {
        const CartItems = localStorage.getItem('CartItems')
        if (CartItems) {
            setCart(JSON.parse(CartItems))
        }
    }, [])


    return (
        <header className='border-b-4 border-gray-50 p-4 flex justify-between items-start relative mb-12 text-gray-50 w-full'
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundPosition: 'bottom',
                WebkitBackgroundSize: "cover",
            }}>

            <div className="nav flex items-center justify-between w-full mx-2">
                <Link className='relative' href={'/cart'} >{cart.length > 0 && (<h5 className='absolute right-0 top-0 w-5 h-5 bg-red-500 text-bgColor flex items-center justify-center text-center rounded-full font-bold text-lg'>{cart.length}</h5>)}<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-14 h-12"><path strokeLinecap="round" strokeLinejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" /></svg></Link>

                {status === 'authenticated' ? <Link className='rounded-full overflow-hidden border-2 flex items-start justify-center text-xl font-semibold' href={{
                    pathname: "/profile",
                    query: {
                        email: session?.user?.email
                    }
                }}><Image src={session?.user?.image} width={50} height={50} alt='Image Profile' /></Link> : <button onClick={() => signIn('google')} className='link'>Login</button>}
            </div>

            <div className="image absolute -bottom-32 left-2/4 -translate-x-1/2 flex flex-col items-center justify-center text-center w-full">
                <Image src={logo} width={120} height={120} alt='Lagham logo' className='bg-gray-950 rounded-full border-gray-50 border-4 mb-3' />
                <h4 className='title text-textColor text-2xl mb-2 font-bold '>Warta Restaurant</h4>
                <div className='text text-sm text-gray-400 font-semibold flex flex-row items-center justify-center'>
                    <Link href={'https://maps.app.goo.gl/cWXUnk4yYSSuN5Nv5'} className='mx-1 underline'>Location on Google Map</Link>|
                    <Link href={'tel:01556266697'} className='mx-1 underline'>0155-626-6697</Link>
                </div>
            </div>
        </header>
    )
}
