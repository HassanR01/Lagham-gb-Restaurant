'use client'
import React, { useState } from 'react'

export default function AddItem() {
    const [titleAr, setTitleAr] = useState()
    const [titleEn, setTitleEn] = useState()
    const [category, setCategory] = useState()
    const [image, setImage] = useState()
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState()
    const [points, setPoints] = useState()
    const [size, setSize] = useState("false")
    const [activation, setActivation] = useState("")
    const [alert, setAlert] = useState()

    const handelSizeChecker = () => {
        if (size === "true") {
            setSize("false")
            setActivation('')
            setPrice(price - 50)
        } else {
            setSize("true")
            setActivation('active')
            setPrice(+price + 50)
        }
    }

    const handelAddItemForm = async (e) => {
        e.preventDefault()
        setAlert('يتم مراجعة البيانات..')

        if (titleAr && titleEn && category && image && price && description && points && size) {
            try {
                const res = await fetch('api/items', {
                    method: "POST",
                    headers: {
                        "Content-type": 'applicaiton/json'
                    },
                    body: JSON.stringify({ titleEn, titleAr, category, image, price, size, description, points })
                })

                if (res.ok) {
                    setAlert('تم الإضافة بنجاح')
                    setTimeout(() => {
                        location.reload()
                    }, 2000);
                } else {
                    setAlert('تقريباً في مشكلة')
                }
            } catch (error) {
                setAlert('تقريباً في مشكلة')
                throw new Error('Cannot Create the Item')
            }
        } else {
            setAlert('كل البيانات مهمة !')
        }
    }

    return (
        <>
            <h2>Add Item</h2>
            <form onSubmit={handelAddItemForm} onChange={() => setAlert('')}>
                <div className="title">
                    <input placeholder='English Title' type="text" name="titleAr" value={titleEn} onChange={(e) => setTitleEn(e.target.value)} />
                    <input className=' text-right' placeholder='العنوان العربي' type="text" name="titleEn" value={titleAr} onChange={(e) => setTitleAr(e.target.value)} />
                </div>
                <div className="details">
                    <select placeholder='Item Category' name="category" value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value=""></option>
                        <option value="smash_burger">Smash Burger</option>
                        <option value="extras">Extras</option>
                        <option value="meals">Meals</option>
                        <option value="chichen_sandwiches">Chicken Sandwiches</option>
                        <option value="fries">Fries</option>
                    </select>
                    <input placeholder='Link Image In Cloudnary' type="text" name="image" value={image} onChange={(e) => setImage(e.target.value)} />
                    <input placeholder='Price' type="number" name="price" value={price} onChange={(e) => setPrice(e.target.value)} />
                    <input placeholder='Points' type="nunber" name="point" value={points} onChange={(e) => setPoints(e.target.value)} />
                </div>
                <div className="checksize">
                    <h4 className='text-xl font-medium'>Is This Item has size choice ?</h4>
                    <div className={`outBox ${activation}`} onClick={() => handelSizeChecker()}>
                        <div className={`inBox ${activation}`}></div>
                    </div>
                    <p>{size ? (<>Yes</>) : (<>No</>)}</p>
                </div>
                <div className="description">
                    <textarea placeholder='Description about The Item' type="text" name="description" value={description} onChange={(e) => setDescription(e.target.value)}></textarea>
                </div>
                <div className="submit flex-col">
                    <h5 className=' text-red-400 font-medium text-lg my-4'>{alert}</h5>
                    <button type="submit" className='btn w-32'>Add</button>
                </div>
            </form>
        </>
    )
}
