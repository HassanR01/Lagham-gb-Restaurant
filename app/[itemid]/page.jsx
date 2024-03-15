import Image from 'next/image';
import React from 'react'
import AddToCart from '../components/item/AddToCart';

const getItem = async (id) => {
  const apiUrl = process.env.API_URL;

  try {
    const res = await fetch(`${apiUrl}/api/items/${id}`, {
      cache: 'no-store'
    })

    if (!res.ok) {
      throw new Error('Cannot Fetch The Item')
    }

    return res.json()
  } catch (error) {
    console.log(error);
  }
}

export default async function Item({ params }) {
  const { itemid } = params
  const { item } = await getItem(itemid)
  const { titleEn, titleAr, category, image, price, description, points, rate } = item

  return (
    <section>
      <div className="itemInfo w-full flex flex-wrap justify-around items-center my-9">
        <div className="image">
          <Image className='rounded-xl' src={image} width={400} height={400} alt={titleAr} />
        </div>
        <div className="info flex flex-col justify-between mx-4">
          <div className="main mb-12 relative">
            <div className="title text-2xl font-bold">
              <h2 className='text-left'>{titleEn}</h2>
              <h2 className=' text-right'>{titleAr}</h2>
            </div>
            <div className="price text-3xl font-bold text-green-400 absolute top-0 right-0">
              <h4>{price} EGP</h4>
            </div>
            <div className="description">
              <p className=' text-xl'>{description}</p>
            </div>
          </div>
          <AddToCart itemInfo={item} />
        </div>
      </div>
      <a href="/" className='link'>Menu</a>
    </section>
  )
}
