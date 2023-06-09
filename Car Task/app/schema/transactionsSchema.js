const mongoose=require('mongoose')

const transactionSchema = new mongoose.Schema({
    buyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'users',
      required: true
    },
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'sellers',
      required: true
    },
    car: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'cars',
      required: true
    },
    city:{
      type:String,
      required:[true,'Please add a city'],    
  }
  
  },{timestamps:true});

  const Transaction=mongoose.model('Trasaction',transactionSchema)
  module.exports=Transaction