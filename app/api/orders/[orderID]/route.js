import connectMongoDB from "@/libs/mongoose"
import Order from "@/models/orders"
import { NextResponse } from "next/server"


export async function PUT(req , {params}){
    const { status } = await req.json()
    const {orderID} = params
    await connectMongoDB()
    await Order.findByIdAndUpdate(orderID, { status })
    return NextResponse.json({message: 'Order Updated'}, {status: 200})
}


export async function DELETE(req , {params}){
    const { orderID } = params
    await connectMongoDB()
    await Order.findByIdAndDelete(orderID)
    return NextResponse.json({message: "Order Deleted"} , {status: 200})
}
