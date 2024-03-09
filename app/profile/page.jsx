import React from 'react'
import LogOut from '../components/buttons/logOut'
import Image from 'next/image'
import Link from 'next/link'

const getUser = async (email) => {
  const apiUrl = process.env.API_URL
  try {
    const res = await fetch(`${apiUrl}/api/users/${email}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Cannot Fetch The User')
    }

    return res.json()

  } catch (error) {
    console.log(error);
  }
}


export default async function Profile({ searchParams }) {
  const email = searchParams.email
  const { user } = await getUser(email)
  const { orders } = user

  return (
    <section>
      <div className="userInfo flex flex-row flex-wrap w-full justify-around items-center pb-4">
        <div className="mainInfo text-xl">
          <Image src={user.image} className='image rounded-full border-4 my-2' width={120} height={120} alt='Profile pic' />
          <h3 className='font-semibold text-2xl'>{user.name}</h3>
          <h4>{user.email}</h4>
        </div>
        <div className="add text-xl font-semibold flex flex-col justify-center items-start">
          <h4>{user.points} Points</h4>
          <h4 className=' py-2'>{orders.length} Orders</h4>
          <a href="/" className='link'>Menu</a>
        </div>
      </div>
      <div className="orders w-full flex items-center justify-center my-4">
        <div className="orderList w-4/5 flex flex-col items-center justify-center rounded-lg border-y-8 p-8">
          <div className="evid flex w-full justify-around items-center text-2xl font-semibold pb-6">
            <h3>Items</h3>
            <h3>Total Price</h3>
            <h3>Phone</h3>
          </div>
          <div className="list w-full flex flex-col justify-center items-center bg-gray-900 rounded-lg p-2">
            {orders.length > 0 && orders.map(order => (
              <div className="order w-full flex flex-col items-center justify-around border-x-4 rounded-lg bg-bgColor text-2xl" key={order._id}>
                <div className="info w-full flex items-center justify-around p-2">
                  <h3>{order.items.length} items</h3>
                  <h3>{order.totalPrice} EGP</h3>
                  <h3>{order.phoneNum}</h3>
                </div>
                <div className="items w-full h-0 overflow-hidden duration-700">
                  {order.items.map((item, ind) => (
                    <div className="item w-full h-full flex flex-col justify-start items-start relative p-4" key={ind}>
                      {item.titleAr}
                      <h6 className='absolute left-2 bottom-2 text-lg'>Location: {order.address}</h6>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="adminDashboard py-3">
        {user.email === 'hassanrageh.236@gmail.com' && (<Link href={{
          pathname: '/Dashboard',
          query: {
            email: user.email
          }
        }} className='link'>Dashboard</Link>)}
      </div>
      <LogOut />
    </section>
  )
}
