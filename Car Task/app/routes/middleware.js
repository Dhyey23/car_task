const Seller = require('../schema/sellersSchema')
const User = require('../schema/usersSchema')

const jwt = require('jsonwebtoken')
const secretKey = 'dhyey'
const messaeges = require('../message')



function authenticateToken(req, res, next) {
  const token = req.headers['authorization']

  if (!token) {
    return res.status(messaeges.status.Forbidden).json(messaeges.messages.unAuthorized)
  }

  jwt.verify(token, secretKey, (err, decoded) => {
    //console.log(token)
    if (err) {

      return res.status(messaeges.status.Forbidden).json(messaeges.messages.unAuthorized)
    }

    req.decoded = decoded

    next()

  })
}

function isAuthorized(req, res, next) {

  let Role = req.decoded.role
  if (Role === 'admin') {
    return next()
  }
  else {

    return res.status(403).json({ error: 'you are not Admin' })
  }
}


const checkCity = async (req, res, next) => {
  try {
    const { seller, buyer } = req.body;

    const sellerCity = await Seller.findOne({ _id: seller });
    //console.log(sellerCity)
    const buyerCity = await User.findOne({ _id: buyer })
    //console.log(buyerCity)
    if (sellerCity.city === buyerCity.city) {
      // if(buyerCity=city){
      next()
    //}
    }
    else {
      return res.status(403).json({ error: 'city not match' })

    }

    //req.seller = seller; 
    //next(); 
  } catch (err) {
    return res
    .status(messaeges.status.statusNotFound)
    .json(messaeges.messages.IDNotFound)  }
};


module.exports = { authenticateToken, isAuthorized, checkCity }