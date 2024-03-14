import mongoose, { Schema } from "mongoose"
const orderSchema = new Schema({
    name: String,
    email: String,
    image: String,
    items: [],
    totalPrice: Number,
    phoneNum: String,
    address: {
        type: String,
        default: 'In The Branch'
    },
    paymentMethod: String,
}, {timestamps: true})

const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)

export default Order;