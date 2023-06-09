const mongoose=require('mongoose')
const sellerSchema=mongoose.Schema({
    
    sellername:{
        type:String,
        required:[true,'Please add a name'],
        
    },
    city:{
        type:String,
        required:[true,'Please add a city'],    
    },
    car:{
        type:mongoose.Schema.Types.ObjectId, ref: 'cars',
        required:[true,'Please add a car'],    
    }
},{timestamps:true})
const Seller=mongoose.model('Seller',sellerSchema)
module.exports=Seller