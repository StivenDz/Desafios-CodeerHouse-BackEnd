import mongoose from 'mongoose';
const {Schema} = mongoose;

const ProductSchema = new Schema({
    productId: String,
    title: String,
    price: Number,
    stock: Number,
    thumbnail:String,
    created_at:{
        type:Date,
        default:Date.now
    }
});

export = mongoose.model('products',ProductSchema);