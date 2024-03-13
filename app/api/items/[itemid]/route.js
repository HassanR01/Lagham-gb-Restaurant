import connectMongoDB from "@/libs/mongoose";
import Item from "@/models/items";
import { NextResponse } from "next/server";

export async function GET(req, { params }) {
    const { itemid } = params;
    await connectMongoDB()
    const item = await Item.findById(itemid)
    return NextResponse.json({ item })
}

export async function PUT(req, { params }) {
    const {itemid} = params
    const { newtitleEn: titleEn, newtitleAr: titleAr, newcategory: category, newimage: image, newprice: price, newdescription: description, newpoints: points, newsize: size, newrate: rate } = await req.json()
    await connectMongoDB()
    await Item.findByIdAndUpdate(itemid, { titleEn, titleAr, category, image, price, description, points, size, rate })
    return NextResponse.json({message: "Item Updated" } , {status: 200})
}


export async function DELETE(req, { params }) {
    const { itemid } = params;
    await connectMongoDB()
    await Item.findByIdAndDelete(itemid)
    return NextResponse.json({ message: "Item Deleted" }, { status: 200 })
}