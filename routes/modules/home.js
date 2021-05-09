// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const RestaurantModel = require('../../models/restaurant')

router.get('/', (req, res) => {
  RestaurantModel.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(restaurantList => res.render('index', { restaurants: restaurantList }))
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router