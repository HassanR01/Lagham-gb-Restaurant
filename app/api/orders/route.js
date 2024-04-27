import connectMongoDB from "@/libs/mongoose"
import Order from "@/models/orders"
import { NextResponse } from "next/server"

export async function POST(req) {
    const { name, email, image, items, totalPrice, phoneNum, address, paymentMethod , status } = await req.json()
    await connectMongoDB()
    const order = await Order.create({ name, email, image, items, totalPrice, phoneNum, address, paymentMethod, status })
    return NextResponse.json({ message : 'Order Sent' } , {status: 201})
}

export async function GET() {
    await connectMongoDB()
    const orders = await Order.find()
    return NextResponse.json({orders})
}