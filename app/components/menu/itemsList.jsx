import Image from 'next/image'
import React from 'react'
import imageFood from '../../../public/hamburger.png'
import Link from 'next/link'
import FilterItems from './FilterItems'

const getItems = async () => {
    const apiUrl = process.env.API_URL;
    try {
        const res = await fetch(`${apiUrl}/api/items`, {
            cache: 'no-store'
        })
        if (!res.ok) {
            throw new Error('Cannot Fetch The Items')
        }

        return res.json()
    } catch (err) {
        console.log(err);
    }
}

export default async function ItemsList({Ctg}) {
    const { items } = await getItems()

    return (
        <>
            <FilterItems items={items} />
        </>
    )
}
