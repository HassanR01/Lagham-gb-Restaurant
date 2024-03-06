'use client'
import { signOut } from 'next-auth/react'

export default function LogOut() {
  return (
      <a href='/' onClick={() => signOut()}>Sign Out</a>
  )
}
