'use client'
import { signOut } from 'next-auth/react'

export default function LogOut() {
  return (
    <button className='linkRed' onClick={() => signOut()}>Sign Out</button>
  )
}
