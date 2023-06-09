const express = require('express')
const routes = express.Router()
const controller = require('./routes/controller')
//const { brand, car, user, seller_add, login, sell_car,adminDash } = require('./routes/controller')
const{authenticateToken, isAuthorized} = require('./routes/middleware')
const{checkCity} = require('./routes/middleware')

routes.post('/brand',controller.brand)
routes.post('/car',controller.car)
routes.post('/user',controller.user )
routes.post('/seller',controller.seller_add)
routes.post('/login',controller.login)
routes.post('/sellCar',checkCity,controller.sell_car)
routes.get("/admin",authenticateToken,isAuthorized,controller.adminDash)


module.exports = {routes}