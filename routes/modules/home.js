// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const RestaurantModel = require('../../models/restaurant')
const sortRules = require('../../public/javascripts/sortRules')

router.get('/', (req, res) => {
  RestaurantModel.find()
    .lean()
    .sort({ _id: 'asc' }) // asc, desc
    .then(restaurantList => res.render('index', { restaurants: restaurantList }))
    .catch(err => console.log(err))
})

router.post('/', (req, res) => {
  const sortDict = sortRules(req.body.sort)
  RestaurantModel.find()
    .lean()
    .sort(sortDict)
    .then(restaurantList => res.render('index', { restaurants: restaurantList, option: req.body.sort }))
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router