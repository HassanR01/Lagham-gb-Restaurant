'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import ChangeOrderStatus from '../buttons/ChangeOrderStatus'
import { useRouter } from 'next/navigation'



export default function OrderList() {
    const [isLoading, setIsLoading] = useState(true)
    const [orders, setOrders] = useState(null)
    const router = useRouter()

    const orderList = async () => {
        try {
            const res = await fetch(`/api/orders`, {
                cache: "no-store"
            })

            if (!res.ok) {
                throw new Error('Cannot Fetch The Orders')
            }

            const result = await res.json()
            setOrders(result.orders)
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false)
        }
    }
    useEffect(() => {
        orderList()

        const intervalId = setInterval(orderList, 1000); // Set interval to 10 minutes

        // Clean up the interval on component unmount
        return () => clearInterval(intervalId);


    }, [])

    function formatDateTimeToArabic(dateStr) {
        // Create a Date object from the given date and time strings
        const dateTime = new Date(dateStr);

        // Configure the formatter with Arabic locale and specific formatting options
        const arabicDateTimeFormatter = new Intl.DateTimeFormat('ar', {
            weekday: 'long', // Include weekday name (like "الأربعاء")
            year: 'numeric', // Include year (like "٢٠٢٣")
            month: 'long', // Full month name (like "مايو")
            day: 'numeric', // Day of the month (like "١٠")
            hour: 'numeric', // Hour
            minute: 'numeric', // Minute
            hour12: true // AM/PM format
        });

        // Return the formatted date and time in Arabic
        return arabicDateTimeFormatter.format(dateTime);
    }


    if (isLoading) {
        return (
            <>
                <h1>يتم تحميل الطلبات..</h1>
            </>
        )
    } else {
        const sortedOrders = orders.sort((a, b) => {
            const dateA = new Date(a.createdAt); // Convert date string to Date object
            const dateB = new Date(b.createdAt);
            return dateA - dateB; // Compare dates
        });

        return (
            <>
                <div className="orders w-full p-4 flex justify-center items-center flex-col-reverse sm:p-8">
                    {sortedOrders.length > 0 && orders.map(order => (
                        <div className={`order w-full p-2 border ${order.status === 'Done' ? 'border-green-400' : order.status === 'fail' ? 'border-red-400' : 'border-gray-400'} rounded-xl my-4`} key={order._id}>
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
                            </div>
                            <div className="created">
                                <h3 className='text-xl'>{order.createdAt.slice(0, 10)} {formatDateTimeToArabic(order.createdAt)}</h3>
                            </div>
                            <div className="location">
                                <h3>العنوان: {order.paymentMethod ? order.address : 'الاستلام في الفرع'}</h3>
                            </div>
                            <div className="itemsList p-4 pb-32 lg:pb-14  relative">
                                <h3 className='text-center text-xl font-semibold'>Items</h3>
                                <div className="items">
                                    {order.items.map((item, ind) => (
                                        <div className="item flex justify-around items-center flex-col my-4" key={ind}>
                                            <div className="items w-full flex justify-between items-center">

                                                <div className="quantity flex items-center justify-center">
                                                    <Image className='rounded-xl ml-2 w-10 h-10' src={item.itemInfo.image} width={80} height={80} alt={item.itemInfo.titleAr} />
                                                    <h3 className='text-xl font-bold'>{item.quantity} {item.itemInfo.titleAr}</h3>
                                                </div>
                                                <div className="price">
                                                    <h3 className='text-xl text-green-300 font-medium'>{item.quantity * item.itemInfo.price - (item.quantity * item.itemInfo.price * 0.1) + (item.size === 'Double' ? (item.quantity * 50 - (item.quantity * 50 * 0.1)) : 0)} ج.م</h3>
                                                </div>
                                                <div className="size">
                                                    <h3>الحجم:</h3>
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
                                <div className="location w-full flex flex-wrap items-center justify-center p-2 absolute left-0 bottom-0">
                                    <ChangeOrderStatus id={order._id} oldstatus={order.status} />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </>
        )
    }
}
