'use client'
import { useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Basket() {
  const [cart, setCart] = useState([])
  const [phone, setPhone] = useState('')
  const [location, setLocation] = useState('')
  const [paymentMethod, setPaymentMethod] = useState('')
  const [subBtn, setsubBtn] = useState('Order Now')
  const [checkBranch, setCheckBranch] = useState('')
  const { status, data: session } = useSession()

  useEffect(() => {
    const CartItems = localStorage.getItem('CartItems')
    if (CartItems) {
      setCart(JSON.parse(CartItems))
    }
  }, [])

  const clearCart = () => {
    setCart([])
    const updateCart = [...cart]
    updateCart.splice(0, cart.length)
    localStorage.setItem('CartItems', JSON.stringify(updateCart))
  }

  const removeItem = (id) => {
    const updateCart = [...cart]
    updateCart.splice(id, 1)
    setCart(updateCart)
    localStorage.setItem('CartItems', JSON.stringify(updateCart))
  }

  const handelSendOrderForm = () => {
    e.preventDefault()
  }

  let totalPrice = 0
  cart.forEach(item => {
    totalPrice = totalPrice + (item.itemInfo.price * item.quantity)
  })

  const handelCheckBranch = () => {
    if (checkBranch === '') {
      setCheckBranch('active')

    } else {
      setCheckBranch('')
    }
  }

  return (
    <section>

      <div className="cartPage w-full flex justify-between items-start">
        {/* Cart */}
        <div className="cartCon w-3/5">
          <div className="cart border border-gray-500 p-5 rounded-xl flex flex-col items-center justify-center">
            <div className="head flex justify-between items-center w-full">
              <h2 className='text-3xl font-medium'>Cart <span className='text-lg text-gray-400'>({cart.length} items)</span></h2>
              <span onClick={() => clearCart()} className='flex text-red-300 cursor-pointer'><svg fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-6 mr-3"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>Clear Cart</span>
            </div>
            <div className='line'></div>
            <div className="itemsList flex flex-col justify-center items-center w-full">
              <div className="evid flex justify-around items-center w-full text-2xl font-medium">
                <h3>Item</h3>
                <h3>Quantity</h3>
                <h3>Price</h3>
              </div>
              <div className="items flex flex-col items-center justify-center w-full">
                {cart.length > 0 ? cart.map((item, index) => (
                  <div key={index} className="item w-full p-2 flex justify-between items-center rounded-xl border border-gray-500 my-2">
                    <div className="details flex justify-center items-center">
                      <Image className='rounded-xl mr-2' src={item.itemInfo.image} width={80} height={80} alt={item.itemInfo.titelAr} />
                      <div className="titles">
                        <h3 className='text-lg font-medium'>{item.itemInfo.titleEn}</h3>
                        <p><span className=' text-gray-500 font-bold'>Size:</span> {item.size}</p>
                      </div>
                    </div>
                    <div className="quantity flex flex-row items-center justify-center">
                      <h3 className='font-medium text-xl mx-4'>{item.quantity}</h3>
                    </div>
                    <div className="price flex">
                      <h2 className='mr-10 text-2xl font-bold text-green-300'>{item.itemInfo.price * item.quantity} EGP</h2>
                      <svg onClick={() => removeItem(index)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 mr-4 text-red-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
                    </div>
                  </div>
                )) : (<>
                  <h4 className='my-8 font-medium text-2xl'>No Items in Cart!</h4>
                  <a className='link' href="/">Menu</a>
                </>
                )}
              </div>
            </div>
          </div>
          {cart.length !== 0 && (<a className='btn my-8' href="/">Add Items From Menu</a>)}
        </div>

        {/* Checkout */}
        <div className="checkout w-2/5 ml-4 rounded-xl border border-gray-500 p-5">
          <div className="head">
            <h2 className='text-3xl font-medium'>Checkout</h2>
          </div>
          <div className="line"></div>
          <div className="cash w-full">
            <h2 className='text-xl font-medium flex items-center justify-between'><span className='text-gray-400 text-lg'>Subtotal</span> <span>{totalPrice} EGP</span></h2>
            <h2 className='text-xl font-medium flex items-center justify-between text-red-400'><span className='text-gray-400 text-lg'>Discount</span> <span>-10%</span></h2>
            <h2 className='text-xl font-semibold flex items-center justify-between text-green-300 my-2'><span className='text-gray-50 text-xl'>Total Price</span> <span>{totalPrice - (totalPrice * 0.1)} EGP</span></h2>
            <h2 className='text-lg font-medium flex items-center justify-between my-2'><span className='text-gray-50 text-lg'>Total Points</span> <span>{totalPrice} Point</span></h2>
          </div>
          <div className="line"></div>
          <div className="check flex w-full justify-between items-center">
            <h2>I'm In The Branch</h2>
            <div className={`outBox ${checkBranch}`}>
              <div onClick={() => handelCheckBranch()} className={`inBox ${checkBranch}`}></div>
            </div>
          </div>
          {checkBranch === '' ? (
            <form className='w-full flex flex-col items-center justify-center' onSubmit={handelSendOrderForm}>
              <input type="tel" name="phone" placeholder='Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
              <input type="text" name="location" placeholder='Your Location' value={location} onChange={(e) => setLocation(e.target.value)} />
              <div className="pay my-6 flex justify-center items-center">
                <input className='hidden' type="radio" name="pay" id="cod" value={'cash on delivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className='sizeChoice mr-2' htmlFor="cod">Cash On Delivery</label>
                <input className='hidden' type="radio" name="pay" id="pol" value={'pay online'} onChange={(e) => setPaymentMethod(e.target.value)} />
                <label className='sizeChoice' htmlFor="pol">Pay Online</label>
              </div>
              {status === "authenticated" ? (<button className='btn w-4/5' type='submit'>{subBtn}</button>) : (<div className='btn w-4/5'>Sign In To Order</div>)}
            </form>
          ) : (<>
            <div className="order w-full flex justify-center items-center mt-4">
              {status === "authenticated" ? (<button className='btn w-4/5' type='submit'>{subBtn}</button>) : (<div className='btn w-4/5'>Sign In To Order</div>)}
            </div>
          </>)}
        </div>
      </div>
    </section>
  )
}
