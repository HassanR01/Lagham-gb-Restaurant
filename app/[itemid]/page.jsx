import React from 'react'

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

  return (
    <section>
      <h1>The Item is {item.titleEn}</h1>
      <a href="/" className='link'>Menu</a>
    </section>
  )
}
