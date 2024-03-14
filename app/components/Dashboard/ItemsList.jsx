import Image from 'next/image'
import React from 'react'
import EditItem from './EditItem'

const Items = async () => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/items`, {
            cache: 'no-store'
        })

        if (!res.ok) {
            throw new Error('Cannot Fetch The Items')
        }
        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export default async function ItemsList() {
    const { items } = await Items()

    return (
        <>
            <div className="container flex w-full flex-col items-center justify-center p-4">
                <div className="evid px-14 m-4 flex items-center justify-around w-full font-bold text-2xl">
                    <h3>Item</h3>
                    <h3>Price</h3>
                    <h3>Rate</h3>
                    <h3>Created</h3>
                </div>
                <div className="items w-full p-4">
                    {items.length > 0 && items.map(item => (
                        <div className="item w-full  rounded-xl my-4 border-gray-500 border flex flex-col justify-between items-center duration-700" key={item._id}>
                            <div className="details w-full p-2 pr-16 flex flex-row justify-between items-center">

                                <div className="titles flex items-center justify-center">
                                    <Image src={item.image} className='mr-2 rounded-xl' width={80} height={80} alt={item.titleEn} />
                                    <div className="title">
                                        <h4 className='font-semibold text-lg text-gray-400'>Title</h4>
                                        <h3 className='font-medium text-xl'>{item.titleEn}</h3>
                                    </div>
                                </div>
                                <div className="price text-2xl text-green-400 font-semibold">
                                    <h3>{item.price} EGP</h3>
                                </div>
                                <div className="rate text-2xl text-yellow-400 font-semibold">
                                    <h3>{item.rate} Stars</h3>
                                </div>
                                <div className="created text-xl flex">
                                    <h3 className='mr-10'>{item.createdAt.slice(0, 10)}</h3>
                                    <svg id='editIcon' fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10" /></svg>
                                </div>
                            </div>
                            <div className="editItem h-0 overflow-hidden duration-700 w-full">
                                <h3 className='text-center text-xl font-medium'>Edit Item</h3>
                                <EditItem item={item} />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </>
    )
}
