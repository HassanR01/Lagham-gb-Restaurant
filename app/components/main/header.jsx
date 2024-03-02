import Link from 'next/link'
import React from 'react'
import bgImage from '../../../public/bg.png'
import Image from 'next/image'
import userImage from '../../../public/men.png'
import basketIcon from '../../../public/basket.svg'
import logo from '../../../public/logo.png'
export default function Header() {

    const user = {
        role: "User",
        status: ' In',
        image: userImage,
    }
    return (
        <header className='border-b-4 border-gray-50 p-4 flex justify-between items-start relative mb-12 text-gray-50 w-full'
            style={{
                backgroundImage: `url(${bgImage.src})`,
                backgroundPosition: 'bottom',
                WebkitBackgroundSize: "cover",
            }}>
            <div className="nav flex items-center justify-between w-full">
                <Link href={'/basket'} ><Image src={basketIcon} width={50} height={50} alt='Basket Logo' /></Link>
                {user.status === 'Logged In' ? <Link className='rounded-full bg-gray-50 flex items-start justify-center p-2 text-xl font-semibold' href={'/profile'}><Image src={user.image} width={30} height={30} alt='Image Profile' /></Link> : <Link href={'/'} className='link'>Login</Link>}
            </div>
            <div className="image absolute -bottom-32 left-2/4 -translate-x-1/2 flex flex-col items-center justify-center text-center">
                <Image src={logo} width={120} height={120} alt='Lagham logo' className='bg-gray-950 p-4 rounded-full border-gray-50 border-4 mb-3' />
                <h4 className='title text-2xl mb-2 font-bold '>Lagham Restaurant</h4>
                <h6 className='text text-sm text-gray-400 font-semibold'>Semoha, Elshahed Eltaiar - B/R2 | 0123-456-7899</h6>
            </div>
        </header>
    )
}
