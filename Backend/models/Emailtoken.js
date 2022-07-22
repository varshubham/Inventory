const mongoose = require('mongoose')
const {Schema} = mongoose

const EmailSchema = new Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref : 'user',
        unique:true
    },
    emailToken:{
        type:Number,
        default : null
    },
    createdAt : {
        type : Date,
        default : Date.now
    }
})

EmailSchema.index({createdAt:1},{expireAfterSeconds:1800})

module.exports = mongoose.model('emailtoken',EmailSchema)