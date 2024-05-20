'use client'
import { useRouter } from 'next/navigation'
import React, { useState } from 'react'

export default function ChangeOrderStatus({ id, oldstatus }) {
    const [status, setStatus] = useState(oldstatus)
    const router = useRouter()

    const handleForm = async (e) => {
        e.preventDefault()

        try {
            const res = await fetch(`/api/orders/${id}`, {
                method: "PUT",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ status })
            })

            if (res.ok) {
                alert('Done')
                router.refresh()
            }

        } catch (error) {
            console.log(error);
        }

    }

    const deleteOrderBtn = async (id) => {
        const confirmed = confirm("هل تريد حذف الطلب فعلاً")
        if (confirmed) {
            try {
                const res = await fetch(`/api/orders/${id}`, {
                    method: "DELETE"
                })

                if (res.ok) {
                    router.refresh()
                }
            } catch (error) {
                console.log(error);
            }
        }
    }

    return (
        <>
            <form onSubmit={handleForm} className='flex items-center justify-center flex-wrap m-2 lg:my-0'>
                <select name="status" value={status} onChange={(e) => setStatus(e.target.value)}>
                    <option value="">حالة الطلب</option>
                    <option value="Done">تم التوصيل</option>
                    <option value="fail">ملغي</option>
                </select>
                <button className='btn'>تغيير الحالة</button>
            </form>
            <button className='linkRed' onClick={() => deleteOrderBtn(id)}>حذف الطلب</button>
        </>
    )
}
