import connectMongoDB from "@/libs/mongoose"
import Order from "@/models/orders"
import { NextResponse } from "next/server"
import nodemailer from 'nodemailer';


export async function POST(req) {
    
    const { name, email, image, items, totalPrice, phoneNum, address, paymentMethod , status } = await req.json()
    await connectMongoDB()
    await Order.create({ name, email, image, items, totalPrice, phoneNum, address, paymentMethod, status })

    // Send email notification to admins
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.GMAIL_USER,
            pass: process.env.GMAIL_PASS,
        },
    });

    const mailOptions = {
        from: process.env.GMAIL_USER,
        to: ['m.3ezzat3295@gmail.com', 'mohamedkhalil.h9@gmail.com', 'hassanrageh.236@gmail.com', 'wartaeg@gmail.com', 'ym983104@gmail.com'],
        subject: 'New Order Placed In Warta',
        text: `A new order has been placed:\n\nPhone Number: ${phoneNum}\nTotal Price: ${totalPrice} EGP\nPayment Method: ${paymentMethod || 'بالفعل في الفرع'}`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(500).json({ message: 'Error sending email'});
        } else {
            console.log('Email sent: ' + info.response);
            res.status(200).json({ message: 'Order placed and email sent'});
        }
    });

    return NextResponse.json({ message : 'Order Sent' } , {status: 201})
}

export async function GET() {
    await connectMongoDB()
    const orders = await Order.find()
    return NextResponse.json({orders})
}