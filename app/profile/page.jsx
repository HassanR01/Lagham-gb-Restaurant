import React from 'react'
import LogOut from '../components/buttons/logOut'

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
      <h1>{user.name}</h1>
      <LogOut />
      <a href="/" className='link'>Menu</a>
    </section>
  )
}
