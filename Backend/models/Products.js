const mongoose = require('mongoose')
const {Schema} = mongoose;

const ProductSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    pname:{
        type: String,
        required : true
    },
    price:{
        type: Number,
        required: true
    },
    category:{
        type : String,
        default : null
    },
    date:{
        type:Date,
        default:Date.now
    }
});

module.exports = mongoose.model('product',ProductSchema)