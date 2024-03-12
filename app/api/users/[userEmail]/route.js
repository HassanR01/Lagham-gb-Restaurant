import connectMongoDB from "@/libs/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"


export async function PUT(req, { params }) {
    const { userEmail } = params
    const { points, orders } = await req.json()
    await connectMongoDB()
    await User.findOneAndUpdate({ email: userEmail }, { $addToSet: { orders }, points })
    return NextResponse.json({message: 'User Updated'} , {status: 200})
}

export async function GET(req, { params }) {
    const { userEmail } = params
    await connectMongoDB()
    const user = await User.findOne({ email: userEmail })
    return NextResponse.json({ user })
}
