'use client'
import { useRouter } from 'next/navigation'
import React from 'react'

export default function ZeroPoints({ email }) {
    const router = useRouter()

    let points = 0
    const zeroPoints = async (email) => {
        const confirmed = confirm('هل تريد إلغاء النقاط لهذا المستخدم')
        if (confirmed) {
            try {
                const res = await fetch(`/api/users/${email}`, {
                    method: "PUT",
                    headers: {
                        'Content-type' : 'application/json'
                    },
                    body: JSON.stringify({points})
                })

                if (res.ok) {
                    router.refresh()
                }
            } catch (error) {
                console.log(error)
            }
        }
    }
  return (
      <button onClick={() => zeroPoints(email)} className='linkRed'>صفر النقاط</button>
  )
}
