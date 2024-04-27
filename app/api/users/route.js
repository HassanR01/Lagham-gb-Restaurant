import connectMongoDB from "@/libs/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function POST(req){
    const { name, email, image, points, orders, phone } = await req.json()
    await connectMongoDB()
    await User.create({ name, email, image, points, orders, phone })
    return NextResponse.json({message: "User Created"} , {status: 201})
}

export async function GET(){
    await connectMongoDB()
    const users = await User.find()
    return NextResponse.json({users})
}
