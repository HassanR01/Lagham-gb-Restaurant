import React from 'react'

export default function Item({ params }) {
  const { itemid } = params
  return (
    <section>
      <h1>The Item is {itemid}</h1>
    </section>
  )
}
