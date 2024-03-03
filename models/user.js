import mongoose, { Schema } from "mongoose"

const userSchema = new Schema({
    name: String,
    email: String,
    image: String,
    points: {
        type: Number,
        default:0,
    },
    orders: [
        {
            items: [],
            totalPrice: Number,
            phoneNum: String,
            address: String
        }
    ]
}, { timestamps: true })

const User = mongoose.models.User || mongoose.model('User', userSchema)

export default User;