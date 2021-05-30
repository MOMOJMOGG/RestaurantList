// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const RestaurantModel = require('../../models/restaurant')
const User = require('../../models/user')
const sortRules = require('../../public/javascripts/sortRules')

router.get('/', (req, res) => {
  const userId = req.user._id
  const { keyword } = req.query || ''
  if (!keyword) {
    return RestaurantModel.find({ userId })
      .lean()
      .sort({ _id: 'asc' }) // asc, desc
      .then(restaurantList => res.render('index', { restaurants: restaurantList }))
      .catch(err => console.log(err))
  } else {
    return RestaurantModel.find({ userId })
      .lean()
      .sort({ _id: 'asc' }) // asc, desc
      .then(restaurantList => {
        const searchResults = restaurantList.filter((rest) => {
          return rest.name_en.toLowerCase().includes(keyword.toLowerCase()) || rest.name.toLowerCase().includes(keyword.toLowerCase())
        })

        if (searchResults.length === 0) {
          const errors = [{ message: 'Searching Error: Not found any restaurant!' }]
          res.render('index', { restaurants: [], keyword, errors })
        } else {
          res.render('index', { restaurants: searchResults, keyword })
        }
      })
      .catch(err => console.log(err))
  }
})

router.post('/', (req, res) => {
  const userId = req.user._id
  const sortDict = sortRules(req.body.sort)
  RestaurantModel.find({ userId })
    .lean()
    .sort(sortDict)
    .then(restaurantList => res.render('index', { restaurants: restaurantList, option: req.body.sort }))
    .catch(err => console.log(err))
})

// 匯出路由模組
module.exports = router