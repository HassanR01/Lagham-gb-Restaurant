import Image from 'next/image'
import React from 'react'
import TotalPrice from './totalPrice'
import ZeroPoints from '../buttons/ZeroPoints'

const UserList = async () => {
    const apiUrl = process.env.API_URL
    try {
        const res = await fetch(`${apiUrl}/api/users`, {
            cache: "no-store"
        })

        if (!res.ok) {
            throw new Error('Cannot Fetch The Users')
        }

        return res.json()
    } catch (error) {
        console.log(error);
    }
}

export default async function UsersList() {
    const { users } = await UserList()
    return (
        <>
            <div className="users p-2 flex w-full flex-wrap justify-center items-center">
                {users.length > 0 && users.map(user => (
                    <div className="user w-80 sm:w-96 flex flex-col justify-between items-center bg-textColor text-bgColor rounded-xl overflow-hidden" key={user._id}>
                        <div className="data w-full flex justify-between items-center bg-gray-300">
                            <div className="image">
                                <Image src={user.image} width={100} height={100} alt='user Image' />
                            </div>
                            <div className="title p-2">
                                <h3 className='text-xl font-semibold'>{user.name}</h3>
                                <h3>{user.email}</h3>
                                {user.orders.map((order, index) => (
                                    <h3 className='my-1 font-medium' key={index}>Phone: {order.phoneNum}</h3>
                                )).slice(0, 1)}
                            </div>
                        </div>
                        <div className="activities w-full p-2">
                            <div className="points w-full flex justify-between items-center">
                                <h3 className='text-xl font-semibold my-'>Points: {user.points} point</h3>
                                <ZeroPoints email={user.email} />
                            </div>
                            <h3 className='text-xl font-semibold my-2'>Orders: {user.orders.length} orders</h3>
                            <h3 className='text-xl font-semibold my-2'>Paid: <TotalPrice user={user} /></h3>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}
