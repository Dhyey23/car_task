const mongoose = require('mongoose')
const brandSchema=mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please add a name'],
        unique:true
    },
    products:{
        type:String,
        required:[true,'Please add a product'],
    }
    
},
{ timestamps: true})
const Brand=mongoose.model('Brand',brandSchema)
module.exports=Brand