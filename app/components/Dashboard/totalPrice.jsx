import React from 'react'

export default function TotalPrice({ user }) {
    const {orders} = user
    let totalPaid = 0
    orders.forEach(order => {
        totalPaid = totalPaid + order.totalPrice
    });
  return (<>{totalPaid} EGP</>)
}
