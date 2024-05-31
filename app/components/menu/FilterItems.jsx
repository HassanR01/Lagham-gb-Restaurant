'use client'
import Image from 'next/image'
import Link from 'next/link'
import React, { useState } from 'react'
import burgerIcon from '../../../public/burger.png'
import offerIcon from '../../../public/offer.png'
import mealIcon from '../../../public/meal.png'
import friesIcon from '../../../public/fries.png'

export default function FilterItems({ items, ctg }) {
    const [category, setCategory] = useState('')
    
    const order = ['offer', 'smash_burger', 'meals', 'fries']

    const comparator = (a, b) => {
        const indexA = order.indexOf(a.category)
        const indexB = order.indexOf(b.category)

        return indexA - indexB
    }

    items.sort(comparator)

    const FilterdItems = items.filter(item => {
        const matchedCtg = !category || item.category === category
        const NotExtra = item.category !== 'extras'
        return matchedCtg && NotExtra
    })

    return (
        <>
            <nav className="w-full flex justify-center items-center">
                <ul className="w-full flex justify-around items-center px-4 py-4">
                    <li className={`${category === 'smash_burger' ? 'selected' : ''}`} onClick={() => setCategory('smash_burger')}><Image src={burgerIcon} width={40} height={40} alt="burger Icon" />برجر</li>
                    <li className={`${category === 'offer' ? 'selected' : ''}`} onClick={() => setCategory('offer')}><Image src={offerIcon} width={40} height={40} alt="Offer Icon" />عروض</li>
                    <li className={`${category === 'meals' ? 'selected' : ''}`} onClick={() => setCategory('meals')}><Image src={mealIcon} width={40} height={40} alt="Meal Icon" />وجبات</li>
                    <li className={`${category === 'fries' ? 'selected' : ''}`} onClick={() => setCategory('fries')}><Image src={friesIcon} width={40} height={40} alt="Fries Icon" />فرايز</li>
                </ul>
            </nav>

            <div className="items m-10 w-full flex flex-wrap items-center justify-center">
                {FilterdItems.map(item => (
                    <Link href={`/${item._id}`} className={`card item show ${item.category}`} key={item._id}>
                        <div className="image">
                            <Image src={item.image} height={300} width={300} alt={'name'} />
                        </div>
                        <div className="text">
                            <h4>{item.titleAr}</h4>
                            <h4>{item.titleEn}</h4>
                            <div className="links flex items-center justify-center flex-wrap">
                                <div className='link' href={`/${item._id}`}>{item.price} L.E</div>
                            </div>
                        </div>
                        <div className="points absolute top-4 right-2 py-0.5 px-2 bg-opacity-50 bg-bgColor rounded-full flex items-center justify-center text-yellow-500 font-semibold text-sm lg:text-xl">
                            <h4>{item.points} نقطة</h4>
                        </div>
                    </Link>
                ))}
            </div>
        </>
    )
}
