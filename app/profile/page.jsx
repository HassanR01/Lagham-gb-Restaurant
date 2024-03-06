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

  return (
    <section>
      <div className="userInfo flex flex-row w-full justify-around items-center">
        <div className="mainInfo">
          <Image src={user.image} width={120} height={120} alt='Profile pic' />
          <h3>{user.name}</h3>
          <h4>{user.email}</h4>
        </div>
        <div className="add">
          <h4>Points: {user.points}</h4>
          <h4>Orders: {user.orders.length}</h4>
          <a href="/" className='link'>Menu</a>
        </div>
      </div>
      <div className="orders">
        <div className="orderList">
          <div className="evid">

          </div>
          <div className="list">

          </div>
        </div>
      </div>
      <div className="adminDashboard">
        {user.email === 'hassanrageh.236@gmail.com' && (<Link href={'/Dashboard'} className='link'>Dashboard</Link>)}
      </div>
      <LogOut />
    </section>
  )
}
