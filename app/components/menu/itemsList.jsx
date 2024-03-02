import Image from 'next/image'
import React from 'react'
import imageFood from '../../../public/hamburger.png'
import Link from 'next/link'

export default function ItemsList() {
    let items = [1, 2, 3, 4, 5, 6,7,8,9]
    return (
        <>
            {items.map(item => (
                <div className="card item" key={item}>
                    <div className="image">
                        <Image src={imageFood} height={300} width={300} alt={'name'} />
                    </div>
                    <div className="text">
                        <h4>Item's Name</h4>
                        <h4>اسم الصنف بالعربي</h4>
                        <h3>120 L.E</h3>
                        <div className="links flex items-center justify-center w-full flex-wrap">
                            <Link className='link' href={`/${item}`}>Order</Link>
                        </div>
                    </div>
                </div>
            ))}
        </>
    )
}
