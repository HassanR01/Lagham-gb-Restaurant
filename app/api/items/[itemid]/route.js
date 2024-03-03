import connectMongoDB from "@/libs/mongoose";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { itemid } = params;
    await connectMongoDB()
    const item = await Item.findById(itemid)
    return NextResponse.json({ item })
}

export async function DELETE(req, { params }) {
    const { itemid } = params;
    await connectMongoDB()
    await Item.findByIdAndDelete(itemid)
    return NextResponse.json({ message: "Item Deleted" }, { status: 200 })
}