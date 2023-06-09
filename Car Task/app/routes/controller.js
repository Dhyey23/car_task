const Brand = require('../schema/brandSchema')
const Car = require('../schema/carsSchema')
const User = require('../schema/usersSchema')
const Seller = require('../schema/sellersSchema')
const Transaction = require('../schema/transactionsSchema')


const jwt = require('jsonwebtoken')
const messages = require('../message')
const secretKey = 'dhyey'

const brand = async (req, res) => {
    try {
        const { name, products } = req.body
        const brand = new Brand({
            name,
            products
        })
        const brandSaved = await brand.save()
        res.status(201).json(brandSaved)
    } catch (err) {
        res.status(500).json({ message: err.message })

    }
}

const car = async (req, res) => {
    try {
        const { name, brand, color, fuelType, model, price } = req.body
        // find brand id
        const brandId = await Brand.findOne({ _id: brand })
        
        if(!brandId){
        
            return res
            .status(messages.status.statusNotFound)
            .json(messages.messages.brandIDNotFound)
        }else{
        const car = new Car({
            name,
            brand,
            color,
            fuelType,
            model,
            price
        })
    
        const carSaved = await car.save()
        res.status(201).json(carSaved)
    }
    } catch (err) {
        console.log(err)
        res.status(500).json({ message: err.message })
    }
}

const user = async (req, res) => {
    try {
        const { username, password,role, city } = req.body
        const user = new User({
            username,
            password,
            role,
            city
        })
        const userSaved = await user.save()
        //res.status(201).json(userSaved)
        return res.status(messages.status.statusSuccess).json({...messages.messages.registeredSuccess, userSaved })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}


const login = async (req, res) => {
    try{
        const {username, password, role } = req.body


         const user = await User.find({username, password, role })
        //const user = await User.find({username: username})

        //console.log(user)
        if (user.length > 0) {
            const token = jwt.sign({ username, password, role }, secretKey, { expiresIn: '1h' })
            return res.status(messages.status.statusSuccess).json({...messages.messages.loginSuccess, token })
        }
        else {
            return res
                .status(messages.status.statusNotFound)
                .json(messages.messages.userNotFound)
        }
    }catch(error){
        console.log(error)
    }
}

const seller_add = async (req, res) => {
    try {
        const { sellername, city, car } = req.body
       
        const carId = await Car.findOne({ _id: car })
        console.log(carId)
        if(!carId){
            return res
            .status(messages.status.statusNotFound)
            .json(messages.messages.carIDNotFound)
        }
        else{
        const seller = new Seller({
            sellername,
            city,
            car
        })
        const sellerSaved = await seller.save()
        res.status(201).json(sellerSaved)
    }
    } catch (err) {
        res.status(500).json({ message: err.message })
    }

}

const sell_car = async (req, res) => {
    try {
       
        const { seller, buyer,  car} = req.body;

       const carId = await Car.findOne({ _id: car });
       if(!carId){
        return res
        .status(messages.status.statusNotFound)
        .json(messages.messages.carIDNotFound)
       }
        const sellerId = await Seller.findOne({ _id: seller });
        if(!sellerId){
            return res
            .status(messages.status.statusNotFound)
            .json(messages.messages.sellerIDNotFound)
        }

        const buyerId = await User.findOne({ _id: buyer });
        console.log(buyerId)
        if(buyerId){
            return res
            .status(messages.status.statusNotFound)
            .json(messages.messages.userNotFound)
        }
        const transaction = new Transaction({
            seller,
            buyer,
            car,
            city:buyerId.city 
        })
        const Transaction1 = await transaction.save()
        res.status(201).json(Transaction1)
    } catch (err) {
        res.status(500).json({ message12: err.message })
    }
}

const adminDash = async (req, res) => {
    try {
        
       const totalCarsSell = await Transaction.countDocuments();
  
        // max sell car
        const mostSellCar = await Transaction.aggregate([
            { $group: { _id: '$car', count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 },
            { $lookup: { from: 'cars', localField: '_id', foreignField: '_id', as: 'carDetails' } },
             { $unwind: '$carDetails' },
            { $project: {  car: '$carDetails.name',_id:0 ,count:1} },
            
            
        ]);

        // max city
        const mostCarSellCity = await Transaction.aggregate([
            {
                $group:{_id:"$city", count:{$sum:1}}
            },
            {$sort:{count:-1}},
            {$limit:1}
        ])
  
        // max sell brand
        const mostSellBrand = await Transaction.aggregate([
    
            {
                $lookup: {
                    from: "cars", 
                    localField: "car",
                    foreignField: "_id",
                    as: "brandData"
                }
            },
            
            { $unwind: "$brandData" },
            {
                $lookup: {
                    from: "brands", 
                    localField: "brandData.brand",
                    foreignField: "_id",
                    as: "brandName"
                }
            },
             { $unwind: "$brandName" },
            { $group: { _id: "$brandName.name", count: { $sum: 1 } } },
            { $sort: { count: -1 } },
            { $limit: 1 }
        ]);
  
        res.status(200).json({
            total_Cars_Sell:totalCarsSell,
            most_Car_Sell_City: mostCarSellCity,
            most_Sell_Car: mostSellCar,
            most_Sell_Brand: mostSellBrand
        });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
  };

module.exports = { brand, car, user, seller_add, login, sell_car,adminDash }