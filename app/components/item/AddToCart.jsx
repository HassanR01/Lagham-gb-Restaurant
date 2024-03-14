'use client'
import React, { useEffect, useState } from 'react'

export default function AddToCart({ itemInfo }) {
  const [size, setSize] = useState('normal')
  const [quantity, setQuantity] = useState(1)
  const [alert, setAlert] = useState('')
  const [cart, setCart] = useState('')
  const item = { itemInfo, quantity, size }

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



  return (
    <form onSubmit={handelAddToCartForm} onChange={() => setAlert('')}>
      {itemInfo.size === 'true' ? (<div className="size mb-4">
        <input className="hidden" type="radio" name="size" id="small" value={'small'} onChange={(e) => setSize(e.target.value)} />
        <label className='sizeChoice rounded-l-xl' htmlFor="small">Small</label>
        <input className='hidden' type="radio" name="size" id="large" value={'large'} onChange={(e) => setSize(e.target.value)} />
        <label className='sizeChoice rounded-r-xl' htmlFor="large">Large</label>
      </div>) : null}
      <div className="quantity text-xl flex flex-row justify-start items-center mt-8 mb-4">
        <div className='btn cursor-pointer' onClick={() => dic()}>-</div>
        <h3 className='mx-6 text-2xl'>{quantity}</h3>
        <div className='btn cursor-pointer' onClick={() => inc()}>+</div>
      </div>
      <h4 className='text-green-400 font-bold text-2xl text-center'>{itemInfo.price * quantity} EGP</h4>
      <h3 className='text-red-400 font-bold text-right'>{alert}</h3>
      <button className='btn w-full mt-4' type="submit">Add To Cart</button>
    </form>

  )
}
