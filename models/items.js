import mongoose, { Schema } from "mongoose"

const itemSchema = new Schema({
    titleEn: String,
    titleAr: String,
    category: String,
    image: {
        type: String,
        default: "https://res.cloudinary.com/db152mwtg/image/upload/v1709404852/Lagham-GB/hkjjjnujxvkrzpjlnqxk.png"
    },
    price: Number,
    description: String,
    points: Number,
    rate: {
        type: Number,
        default: 5,
    },

}, {timestamps: true})

const Item = mongoose.models.Item || mongoose.model('Item', itemSchema)

export default Item;