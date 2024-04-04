import Image from 'next/image'
import React from 'react'

const orderList = async () => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/orders`, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error('Cannot Fetch The Orders')
        }

        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export default async function OrderList() {
    const { orders } = await orderList()
    return (
        <>
            <div className="orders w-full p-4 flex justify-center items-center flex-col-reverse sm:p-8">
                {orders.length > 0 && orders.map(order => (
                    <div className="order w-full p-2 border border-gray-400 rounded-xl my-4" key={order._id}>
                        <div className="titles  flex flex-row items-center justify-between">

                            <div className="user">
                                <h3 className='font-semibold text-xl'>{order.name}</h3>
                                <h3 className='font-semibold text-xl'>{order.phoneNum}</h3>
                            </div>
                            <div className="price">
                                <h3 className='text-2xl text-green-400 font-bold'>{order.totalPrice} EGP</h3>
                            </div>
                            <div className="itemLength">
                                <h3 className='text-xl font-semibold'>{order.items.length > 1 ? `${order.items.length} Items` : `${order.items.length} Item`} </h3>
                            </div>
                            <div className="payment">
                                <h3 className='text-xl font-medium'>{order.paymentMethod}</h3>
                            </div>
                            <div className="created hidden lg:block">
                                <h3 className='text-xl'>{order.createdAt.slice(0, 10)} {order.createdAt.slice(12, 16)}</h3>
                            </div>
                        </div>
                        <div className="itemsList p-4 relative">
                            <h3 className='text-center text-xl font-semibold'>Items</h3>
                            <div className="items">
                                {order.items.map((item, ind) => (
                                    <div className="item flex justify-around items-center flex-col my-4" key={ind}>
                                        <div className="items w-full flex justify-between items-center">

                                            <div className="quantity flex items-center justify-center">
                                                <Image className='rounded-xl mr-2 w-10 h-10' src={item.itemInfo.image} width={80} height={80} alt={item.itemInfo.titleAr} />
                                                <h3 className='text-xl font-bold'>{item.quantity} {item.itemInfo.titleEn}</h3>
                                            </div>
                                            <div className="price">
                                                <h3 className='text-xl text-green-300 font-medium'>{item.quantity * item.itemInfo.price - (item.quantity * item.itemInfo.price * 0.1)} EGP</h3>
                                            </div>
                                            <div className="size">
                                                <h3>Size:</h3>
                                                <h3 className='text-xl font-semibold'>{item.size}</h3>
                                            </div>
                                        </div>
                                        <div className="itemExtras flex w-full justify-start items-center overflow-auto">
                                            {item.extras?.length > 0 && item.extras.map(extraItem => (
                                                <div key={extraItem._id} className="item flex items-center justify-center flex-col">
                                                    <Image src={extraItem.image} width={50} height={50} alt='item' />
                                                    <h3>{extraItem.titleAr}</h3>
                                                    <h3 className='text-green-300 font-medium'>{extraItem.price} EGP</h3>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <div className="location absolute left-3 bottom-0">
                                <h3>Location: {order.address}</h3>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
