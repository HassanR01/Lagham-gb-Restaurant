'use client'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function AddToCart({ itemInfo, ExtrasItems }) {
  const [size, setSize] = useState('normal')
  const [quantity, setQuantity] = useState(1)
  const [alert, setAlert] = useState('')
  const [cart, setCart] = useState('')
  const [extras, setExtras] = useState([])



  let totalExtrasPrice = 0
  extras.forEach(extra => {
    totalExtrasPrice = totalExtrasPrice + extra.price
  })
  let totalPrice = totalExtrasPrice + (itemInfo.price * quantity) + (size === 'large' ? 50 * quantity : 0)
  const item = { itemInfo, quantity, size, extras, totalPrice }

  console.log(itemInfo);

  useEffect(() => {
    const CartItems = localStorage.getItem('CartItems')
    if (CartItems) {
      setCart(JSON.parse(CartItems))
    }
  }, [])

  const handelAddToCartForm = (e) => {
    e.preventDefault()
    setAlert('يتم مراجعة البيانات..')
    if (quantity <= 0 || itemInfo.size === "true" && size === 'normal') {
      setAlert('!اختار الحجم')
    } else {
      const updateCart = [...cart, item]
      setCart(updateCart)
      localStorage.setItem('CartItems', JSON.stringify(updateCart))
      location.replace('/cart')
      setQuantity(0)
    }
  }

  const inc = () => {
    if (quantity > 99) {
      setAlert('!مش ممكن يكون اكتر من كدا')
    } else {
      setQuantity(quantity + 1)
    }
  }

  const dic = () => {
    if (quantity === 1) {
      setAlert('!مش ممكن يكون اقل من كدا')
    } else {
      setQuantity(quantity - 1)
    }
  }

  const AddToExtras = (ExtraItem) => {
    const updateEx = [...extras, ExtraItem]
    setExtras(updateEx)
  }

  const RemoveFromExtras = (id) => {
    const updateEx = [...extras]
    updateEx.splice(id, 1)
    setExtras(updateEx)
  }



  return (
    <form onSubmit={handelAddToCartForm} onChange={() => setAlert('')} className='w-full'>
      {itemInfo.size === 'true' ? (
        <>
          <h2 className='text-xl font-medium'>Choose Size:</h2>
          <div className="size flex items-center justify-center my-4">
            <input className="hidden" type="radio" name="size" id="small" value={'Single'} onChange={(e) => setSize(e.target.value)} />
            <label className='sizeChoice px-10 rounded-l-xl' htmlFor="small">Single</label>
            <input className='hidden' type="radio" name="size" id="large" value={'Double'} onChange={(e) => setSize(e.target.value)} />
            <label className='sizeChoice px-10 rounded-r-xl' htmlFor="large">Double</label>
          </div>
        </>
      ) : null}
      {itemInfo.showExtras === 'active' ? (
        <>
          <h2 className='text-xl font-medium'>Choose Extras:</h2>
          <div className='extrasCon w-full flex items-center justify-start overflow-auto'>
            {ExtrasItems.map(item => (
              <div key={item._id} onClick={() => AddToExtras(item)} className="extraItem flex items-center justify-center flex-col m-2">
                <Image src={item.image} width={100} height={100} alt={item.titleAr} />
                <h3>{item.titleAr}</h3>
                <h3>{item.price} EGP</h3>
              </div>
            ))}
          </div>
          {extras.length > 0 && (
            <>
              <h2 className='text-xl font-medium'>Added Extras: </h2>
              <div className="extrasAdded w-full flex items-center justify-center p-2">
                <div className="added w-full flex items-center justify-start overflow-auto">
                  {extras.map((extra, index) => (
                    <div key={extra._id} className="extraItem relative flex items-center justify-center flex-col min-w-32">
                      <Image src={extra.image} width={50} height={50} alt={extra.titleAr} />
                      <h3 className='text-sm'>{extra.titleAr}</h3>
                      <div onClick={() => RemoveFromExtras(index)} className="remove absolute top-0 left-3 bg-red-500 w-5 h-5 flex items-center justify-center rounded-full text-bgColor"><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" ><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg></div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </>
      ) : null}
      <div className="quantity text-xl flex flex-row sm:justify-start justify-around items-center mt-8 mb-4">
        <div className='btn cursor-pointer' onClick={() => dic()}>-</div>
        <h3 className='mx-6 text-2xl'>{quantity}</h3>
        <div className='btn cursor-pointer' onClick={() => inc()}>+</div>
      </div>
      <h4 className='text-green-400 font-bold text-2xl text-center'>{totalPrice} EGP</h4>
      <h5 className='text-red-400 font-bold text-right'>{alert}</h5>
      <button className='btn w-full mt-4' type="submit">Add To Cart</button>
    </form>

  )
}
