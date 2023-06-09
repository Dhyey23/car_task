const mongoose=require('mongoose')
const connectDb=async()=>{
    try {
        const conn=await mongoose.connect('mongodb+srv://pateldhyey:XbAHSszBTSW8xeGF@cluster0.lfysxfd.mongodb.net/')
        console.log('MongoDb connected'+ conn.connection.host)
    }
    catch(error){
        console.log(error)
        process.exit(1)
    }}

module.exports=connectDb