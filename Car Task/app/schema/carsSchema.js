const mongoose = require('mongoose')
const carSchema=mongoose.Schema({

    name:{
        type:String,
        required:[true,'Please add a name'],
        
    },
    brand:{
        type:mongoose.Schema.Types.ObjectId, ref: 'brands',
        required:[true,'Please add a brand'],
    },
    
    color:{
        type:String,
        required:[true,'Please add a color'],
    },
    
    fuelType:{
        type:String,
        required:[true,'Please add a fuel type'],
    },
    model:{
        type:Number,
        required:[true,'Please add a model'],
    },
    price:{
        type:Number,
        required:[true,'Please add a price'],
    }
    
},
{ timestamps: true})
const Car=mongoose.model('Car',carSchema)
module.exports=Car