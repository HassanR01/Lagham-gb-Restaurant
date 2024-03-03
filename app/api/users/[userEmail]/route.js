import connectMongoDB from "@/libs/mongoose"
import User from "@/models/user"
import { NextResponse } from "next/server"

export async function GET(req, { params }) {
    const { userEmail } = params
    await connectMongoDB()
    const user = await User.findOne({email: userEmail})
    return NextResponse.json({user})
}
