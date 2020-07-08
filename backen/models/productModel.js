const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {type:String, required:true},
    category: {type:String, required:true},
    image: {type:String, required:true},
    price: {type:Number, required:true, default:0},
    brand: {type:String, required:true},
    rating: {type:Number, required:true, default:0},
    numReviews: {type:Number, required:true, default:0},
    countInStock: {type:Number, required:true, default:0},
    description: {type:String, required:true}
})

const productModel = mongoose.model('Product', productSchema);

module.exports = productModel;