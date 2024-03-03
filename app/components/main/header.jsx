'use client'
import Link from 'next/link'
import React from 'react'
import bgImage from '../../../public/bg.png'
import Image from 'next/image'
import userImage from '../../../public/men.png'
import basketIcon from '../../../public/basket.svg'
import logo from '../../../public/logo.png'
import { signIn, useSession } from 'next-auth/react'
export default function Header() {
    const { status, data: session } = useSession()



    return (
        <header className='border-b-4 border-gray-50 p-4 flex justify-between items-start relative mb-12 text-gray-50 w-full'
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundPosition: 'bottom',
                WebkitBackgroundSize: "cover",
            }}>

            <div className="nav flex items-center justify-between w-full">
                <Link href={{
                    pathname: '/basket',
                    query: {
                        email: session?.user?.email
                    }
                }} ><Image src={basketIcon} width={50} height={50} alt='Basket Logo' /></Link>

                {status === 'authenticated' ? <Link className='rounded-full overflow-hidden border-2 flex items-start justify-center text-xl font-semibold' href={{
                    pathname: "/profile",
                    query: {
                        email: session?.user?.email
                    }
                }}><Image src={session?.user?.image} width={40} height={40} alt='Image Profile' /></Link> : <button onClick={() => signIn('google')} className='link'>Login</button>}
            </div>

            <div className="image absolute -bottom-32 left-2/4 -translate-x-1/2 flex flex-col items-center justify-center text-center">
                <Image src={logo} width={120} height={120} alt='Lagham logo' className='bg-gray-950 p-4 rounded-full border-gray-50 border-4 mb-3' />
                <h4 className='title text-2xl mb-2 font-bold '>Lagham Restaurant</h4>
                <h6 className='text text-sm text-gray-400 font-semibold'>Semoha, Elshahed Eltaiar - B/R2 | 0123-456-7899</h6>
            </div>
        </header>
    )
}
