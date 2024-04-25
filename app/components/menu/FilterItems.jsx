'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'

export default function FilterItems({ items, ctg }) {
    const [category, setCategory] = useState(ctg)

    const FilterdItems = items.filter(item => {
        const matchedCtg = !category || item.category === category
        const NotExtra = item.category !== 'extras'
        return matchedCtg && NotExtra
    })

    return (
        <>
            {FilterdItems.map(item => (
                <Link href={`/${item._id}`} className={`card item show ${item.category}`} key={item._id}>
                    <div className="image">
                        <Image src={item.image} height={300} width={300} alt={'name'} />
                    </div>
                    <div className="text">
                        <h4>{item.titleEn}</h4>
                        <h4>{item.titleAr}</h4>
                        <div className="links flex items-center justify-center flex-wrap">
                            <div className='link' href={`/${item._id}`}>{item.price} L.E</div>
                        </div>
                    </div>
                    <div className="points absolute top-4 right-2 py-0.5 px-2 bg-opacity-50 bg-bgColor rounded-full flex items-center justify-center text-yellow-500 font-semibold text-sm lg:text-xl">
                        <h4>{item.points} Point</h4>
                    </div>
                </Link>
            ))}
        </>
    )
}
