const mongoose=require('mongoose')
const userSchema=mongoose.Schema({
    
    username:{
        type:String,
        required:[true,'Please add a username'],
        unique:true
    },
    
    password:{
        type:String,
        required:[true,'Please add a password'],    
    },
    role:{
        type:String,
        required:[true,'Please add a role'],    
    },
    city:{
        type:String,
        required:[true,'Please add a city'],    
    }
    
},{timestamps:true})
const Users=mongoose.model('User',userSchema)
module.exports=Users