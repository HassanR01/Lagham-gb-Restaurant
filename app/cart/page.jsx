'use client'
import { signIn, useSession } from 'next-auth/react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'

export default function Basket() {
  const [cart, setCart] = useState([])
  const [phone, setPhone] = useState()
  const [point, setpoint] = useState(0)
  const [zone, setZone] = useState('')
  const [street, setStreet] = useState("")
  const [building, setBuilding] = useState("")
  const [floor, setFloor] = useState("")
  const [NumberOfApartment, setNumberOfApartment] = useState("")
  const [paymentMethod, setPaymentMethod] = useState()
  const [subBtn, setsubBtn] = useState('Order Now')
  const [checkBranch, setCheckBranch] = useState("")
  const [checkUsingPoints, setCheckUsingPoints] = useState("")
  const [alert, setAlert] = useState()
  const { status, data: session } = useSession()

  let location = `${zone} - ${street} - ${building} الدور ${floor} شقة رقم ${NumberOfApartment}`

  useEffect(() => {
    const CartItems = localStorage.getItem('CartItems')
    if (CartItems) {
      setCart(JSON.parse(CartItems))
    }
    const point = localStorage.getItem('Points')
    if (point) {
      setpoint(JSON.parse(point))
    }
  }, [])

  let totalPrice = 0
  cart.forEach(item => {
    totalPrice = totalPrice + (item.totalPrice)
  })

  if (checkUsingPoints === 'active') {
    totalPrice = 0
  }

  let itemsPoints = 0
  cart.forEach(item => {
    itemsPoints += (+item.itemInfo.points * +item.quantity)
  })

  let points = +point + +totalPrice

  const orders = {
    name: session?.user?.name,
    email: session?.user?.email,
    image: session?.user?.image,
    items: [...cart],
    totalPrice: Math.floor((totalPrice - (totalPrice * 0.1)) + (checkBranch === 'active' ? 0 : 35)),
    phoneNum: phone,
    address: location,
    paymentMethod: paymentMethod
  }

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


  const handelCheckBranch = () => {
    if (checkBranch === '') {
      setCheckBranch('active')

    } else {
      setCheckBranch('')
    }
    setAlert('')
  }

  const useMyPoints = () => {
    if (checkUsingPoints === '') {
      setCheckUsingPoints('active')
      setPaymentMethod('Paid By Points')
      setpoint(point - itemsPoints)
    } else {
      setCheckUsingPoints('')
    }
  }

  const handelSendDOrderForm = async (e) => {
    e.preventDefault()
    setAlert('يتم مراجعة البيانات')
    if (cart.length > 0) {
      if (paymentMethod) {
        if (phone && zone && street && building && NumberOfApartment && floor) {
          const res = await fetch(`api/users/${session?.user?.email}`, {
            method: 'PUT',
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify({ orders, points, phone })
          })

          const resO = await fetch('api/orders', {
            method: "POST",
            headers: {
              "Content-type": "application/json"
            },
            body: JSON.stringify(orders)
          })


          if (res.ok && resO.ok) {
            setPhone('')
            setAlert(`شكراً، هنتواصل معاك حالاً يا استاذ ${session?.user?.name}`)
            localStorage.setItem('Points', JSON.stringify(point + totalPrice))
            setCart([])
            const updateCart = [...cart]
            updateCart.splice(0, cart.length)
            localStorage.setItem('CartItems', JSON.stringify(updateCart))
          } else {
            setAlert('غالباً في مشكلة')
            throw new Error('Cannot Sent The Order')
          }

        } else {
          setAlert('رقم التلفون و العنوان مهمين')
        }
      } else {
        setAlert("مش ناوي تدفع!")
      }
    } else {
      setAlert('انت مطلبتش حاجة حضرتك')
    }

  }

  const handelSendOrderForm = async (e) => {
    e.preventDefault()
    setAlert('يتم مراجعة البيانات')

    if (cart.length > 0) {

      if (phone) {
        const res = await fetch(`api/users/${session?.user?.email}`, {
          method: 'PUT',
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify({ orders, points })
        })

        const resO = await fetch('api/orders', {
          method: "POST",
          headers: {
            "Content-type": "application/json"
          },
          body: JSON.stringify(orders)
        })


        if (res.ok && resO.ok) {
          setPhone('')
          setAlert(`شكراً، هنتواصل معاك حالاً يا استاذ ${session?.user?.name}`)
          localStorage.setItem('Points', JSON.stringify(point + totalPrice))
          setCart([])
          const updateCart = [...cart]
          updateCart.splice(0, cart.length)
          localStorage.setItem('CartItems', JSON.stringify(updateCart))
        } else {
          setAlert('غالباً في مشكلة')
          throw new Error('Cannot Sent The Order')
        }

      } else {
        setAlert('ممكن رقم تلفونك ، مش هقوله لحد!')
      }

    } else {
      setAlert('انت مطلبتش حاجة حضرتك')
    }

  }




  return (
    <section>

      <div className="cartPage w-full flex justify-center items-start flex-wrap">
        {/* Cart */}
        <div className="cartCon w-full xl:w-3/5">
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
                      <h3 className='font-medium text-xs lg:text-xl mx-4'>{item.quantity}</h3>
                      <h3 className='font-medium text-xs lg:text-xl mx-4'>{item.extras.length} Extra</h3>
                    </div>
                    <div className="price flex items-center justify-center">
                      <h3 className='mr-10 text-2xl font-bold text-green-300'>{item.totalPrice} EGP</h3>
                      <svg onClick={() => removeItem(index)} fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 sm:mr-4 text-red-400 cursor-pointer"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" /></svg>
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
        <div className="checkout w-full rounded-xl border border-gray-500 my-4 p-5 xl:w-2/6 xl:ml-4 xl:my-0">
          <div className="head">
            <h2 className='text-3xl font-medium'>Checkout</h2>
          </div>
          <div className="line"></div>
          <div className="cash w-full">
            <h2 className='text-lg font-medium flex items-center justify-between'><span className='text-gray-50 text-lg'>Your Total point</span> <span>{point} Point</span></h2>
            <h2 className='text-lg font-medium flex items-center justify-between'><span className='text-gray-50 text-lg'>Total Items point</span> <span>{itemsPoints} Point</span></h2>
            {point > itemsPoints && (<div className="usePoints flex w-full items-center justify-around mt-3">
              <h3 className=' text-lg font-medium'>Use My Points</h3>
              <div onClick={() => useMyPoints()} className={`outBox ${checkUsingPoints}`}>
                <div className={`inBox ${checkUsingPoints}`}></div>
              </div>
            </div>
            )}
            <div className="line"></div>
            <h2 className='text-xl font-medium flex items-center justify-between'><span className='text-gray-400 text-lg'>Subtotal</span> <span>{totalPrice} EGP</span></h2>
            <h2 className='text-lg font-medium flex items-center justify-between text-red-400'><span className='text-gray-400 text-lg'>Discount</span> <span>-10%</span></h2>
            {checkBranch === '' && (<h2 className='text-lg font-medium flex items-center justify-between text-green-300'><span className='text-gray-400 text-lg'>Delivery</span> <span>35 EGP</span></h2>)}
            <h2 className='text-xl font-semibold flex items-center justify-between text-green-300 my-2'><span className='text-gray-50 text-xl'>Total Price</span> <span>{Math.floor((totalPrice - (totalPrice * 0.1)) + (checkBranch === 'active' ? 0 : 35))} EGP</span></h2>
          </div>
          <div className="line"></div>
          <div className="check flex w-full justify-between items-center">
            <h2>I'm In The Branch</h2>
            <div className={`outBox ${checkBranch}`}>
              <div onClick={() => handelCheckBranch()} className={`inBox ${checkBranch}`}></div>
            </div>
          </div>
          {checkBranch === '' ? (
            <form className='DeleveryForm w-full flex flex-col items-center justify-center' onChange={() => setAlert('')} onSubmit={handelSendDOrderForm}>
              {status === "authenticated" ? (
                <>
                  <input type="tel" name="phone" placeholder='Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                  <div className="location w-full">
                    <select name='zone' value={zone} onChange={(e) => setZone(e.target.value)}>
                      <option value="">اختر المنطقة</option>
                      <option value="سموحة">سموحة</option>
                      <option value="كفر عبده">كفر عبده</option>
                      <option value="سيدي جابر">سيدي جابر</option>
                      <option value="الازاريطة">الازاريطة</option>
                      <option value="محطة الرمل">محطة الرمل</option>
                      <option value="محرم بك">محرم بك</option>
                      <option value="جليم">جليم</option>
                      <option value="مصطفي كامل">مصطفي كامل</option>
                      <option value="رشدي">رشدي</option>
                      <option value="سان ستيفانو">سان ستيفانو</option>
                    </select>
                    <p className='text-red-400 text-xs sm:text-sm mt-1 mr-1'>* سيتم فتح المناطق من محمد نجيب الي المندرة قريباً</p>
                    <input type="text" name="street name" placeholder='اسم الشارع' value={street} onChange={(e) => setStreet(e.target.value)} />
                    <input type="text" name="building" placeholder='اسم او رقم العمارة' onChange={(e) => setBuilding(e.target.value)} />
                    <div className="apartment w-full flex items-center justify-between">
                      <input type="text" name="floor" placeholder='الدور' value={floor} onChange={(e) => setFloor(e.target.value)} />
                      <input type="text" name="numberOfTheApartment" placeholder='رقم الشقة' value={NumberOfApartment} onChange={(e) => setNumberOfApartment(e.target.value)} />
                    </div>
                  </div>
                  <div className="pay my-4 flex justify-center items-center">
                    <input className='hidden' type="radio" name="pay" id="cod" value={'cash on delivery'} onChange={(e) => setPaymentMethod(e.target.value)} />
                    <label className='sizeChoice px-3 mr-2' htmlFor="cod">Cash On Delivery</label>
                  </div>
                  <h5 className='font-bold text-lg text-center text-red-400 mb-4'>{alert}</h5>

                  <button className='btn w-4/5' type='submit'>{subBtn}</button>
                </>
              ) : (<div onClick={() => signIn('google')} className='btn mt-4 w-4/5'>Sign In To Order</div>)}
            </form>
          ) : (<>
            <div className="order w-full flex justify-center items-center mt-4">
              {status === "authenticated" ? (
                <>

                  <form className='w-full flex flex-col items-center justify-center' onChange={() => setAlert('')} onSubmit={handelSendOrderForm} >
                    <input type="tel" name="phone" placeholder='Your Phone Number' value={phone} onChange={(e) => setPhone(e.target.value)} />
                    <h5 className='font-bold text-lg text-red-400 text-center'>{alert}</h5>

                    <button className='btn w-4/5 mt-4' type='submit'>{subBtn}</button>
                  </form>
                </>
              ) : (<div onClick={() => signIn('google')} className='btn w-4/5'>Sign In To Order</div>)}
            </div>
          </>)}
        </div>
      </div>
    </section>
  )
}
