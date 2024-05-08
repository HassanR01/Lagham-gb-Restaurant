'use client'
import React, { useState } from 'react'

export default function EditItem({ item }) {
    const { titleEn, titleAr, category, image, price, description, points, size, showExtras } = item
    const [newtitleEn, setNewtitleEn] = useState(titleEn)
    const [newtitleAr, setNewtitleAr] = useState(titleAr)
    const [newcategory, setNewcategory] = useState(category)
    const [newimage, setNewimage] = useState(image)
    const [newprice, setNewprice] = useState(price)
    const [newdescription, setNewdescription] = useState(description)
    const [newpoints, setNewpoints] = useState(points)
    const [newsize, setNewsize] = useState(size)
    const [activation, setActivation] = useState(`${newsize === 'true' ? 'active' : ''}`)
    const [newshowExtras, setNewShowExtars] = useState(showExtras)
    const [alert, setAlert] = useState()

    const handelSizeChecker = () => {
        if (newsize === 'true') {
            setActivation('')
            setNewsize('false')
        } else {
            setActivation('active')
            setNewsize('true')
        }
    }

    const handelEditItemForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات..')
        if (newtitleAr && newtitleEn && newcategory && newimage && newprice && newdescription && newpoints && newsize) {
            try {
                const res = await fetch(`api/items/${item._id}`, {
                    method: "PUT",
                    headers: {
                        'Content-type': 'application/json'
                    },
                    body: JSON.stringify({ newtitleAr, newtitleEn, newcategory, newimage, newprice, newdescription, newpoints, newsize, newshowExtras })
                })

                if (res.ok) {
                    setAlert('تم تعديل الصنف')
                    location.reload()
                } else {
                    setAlert('تقريباً في مشكلة')
                }


            } catch (error) {
                console.log(error);
            }
        } else {
            setAlert('كل البيانات مهمة')
        }
    }


    const DeleteItem = async (id) => {
        if (confirm('هل تريد حذف هذا الصنف ؟')) {

            try {
                const res = await fetch(`api/items/${id}`, {
                    method: 'DELETE'
                })

                if (res.ok) {
                    setAlert('تم الحذف')
                    location.reload()
                }
            } catch (error) {
                console.log(error);
            }
        }
    }
    const handleShowExtras = () => {
        if (newshowExtras === '') {
            setNewShowExtars('active')
        } else {
            setNewShowExtars('')
        }
    }

    return (
        <>
            <form onSubmit={handelEditItemForm}>
                <div className="title">
                    <input placeholder='English Title' type="text" name="titleAr" value={newtitleEn} onChange={(e) => setNewtitleEn(e.target.value)} />
                    <input className=' text-right' placeholder='العنوان العربي' type="text" name="titleEn" value={newtitleAr} onChange={(e) => setNewtitleAr(e.target.value)} />
                </div>
                <div className="details">
                    <select placeholder='Item Category' name="category" value={newcategory} onChange={(e) => setNewcategory(e.target.value)}>
                        <option value="">Category</option>
                        <option value="smash_burger">برجر</option>
                        <option value="offer">عروض</option>
                        <option value="meals">وجبات</option>
                        <option value="fries">فرايز</option>
                        <option value="extras">إضافات</option>
                    </select>
                    <input placeholder='Link Image In Cloudnary' type="text" name="image" value={newimage} onChange={(e) => setNewimage(e.target.value)} />
                    <input placeholder='Price' type="number" name="price" value={newprice} onChange={(e) => setNewprice(e.target.value)} />
                    <input placeholder='Points' type="nunber" name="point" value={newpoints} onChange={(e) => setNewpoints(e.target.value)} />
                </div>
                <div className="checksize">
                    <h4 className='text-lg font-medium'>Is This Item has size choice ?</h4>
                    <p className='ml-1'>{activation === 'active' ? (<>Yes</>) : (<>No</>)}</p>
                    <div className={`outBox ${activation}`} onClick={() => handelSizeChecker()}>
                        <div className={`inBox ${activation}`}></div>
                    </div>
                </div>
                <div className="showExtras">
                    <h4 className='text-lg font-medium'>Show Extras in This Item ?</h4>
                    <p className='ml-1'>{newshowExtras === 'active' ? (<>Yes</>) : (<>No</>)}</p>
                    <div className={`outBox ${newshowExtras}`} onClick={() => handleShowExtras()}>
                        <div className={`inBox ${newshowExtras}`}></div>
                    </div>
                </div>
                <div className="description">
                    <textarea placeholder='Description about The Item' type="text" name="description" value={newdescription} onChange={(e) => setNewdescription(e.target.value)}></textarea>
                </div>
                <div className="submit flex-col">
                    <h5 className=' text-red-400 font-medium text-lg my-2'>{alert}</h5>
                    <div className="btns flex items-center justify-center w-full">
                        <button type="submit" className='btn w-32 mr-4'>Edit</button>
                        <div onClick={() => DeleteItem(item._id)} className='linkRed cursor-pointer'>Delete</div>
                    </div>
                </div>
            </form>
        </>
    )
}
