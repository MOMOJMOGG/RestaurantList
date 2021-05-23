// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const RestaurantModel = require('../../models/restaurant')

// query searching
router.get('/search', (req, res) => {
  RestaurantModel.find()
    .lean()
    .then(restaurantList => {
      const restaurants = restaurantList.filter((rest) => {
        return rest.name_en.toLowerCase().includes(req.query.keyword.toLowerCase()) || rest.name.toLowerCase().includes(req.query.keyword.toLowerCase())
      })

      if (restaurants.length === 0) {
        res.render('searchingError', { keyword: req.query.keyword })
      } else {
        res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
      }
    })
    .catch(err => console.log(err))
})

// render new page
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new restaurant list
router.post('/new/create', (req, res) => {
  const options = req.body
  const createSucceed = true
  RestaurantModel.create({
    name: options.restName,
    name_en: options.restNameEn,
    category: options.restCategory,
    image: options.restImage,
    location: options.restLocation,
    phone: options.restPhone,
    google_map: options.restGoogleMap,
    rating: options.restRating,
    description: options.restDescription
  })
    .then(() => res.render('new', { options, createSucceed }))
    .catch(err => console.log(err))
})

// dynamic router using params
router.get('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// render edit restaurant list
router.get('/:restaurantId/edit', (req, res) => {
  const { restaurantId } = req.params
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// render edit succeed page
router.get('/:restaurantId/edit/succeed', (req, res) => {
  const { restaurantId } = req.params
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant, createSucceed: true }))
    .catch(err => console.log(err))
})

// edit restaurant list
router.put('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  const options = req.body
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = options.restName
      restaurant.name_en = options.restNameEn
      restaurant.category = options.restCategory
      restaurant.image = options.restImage
      restaurant.location = options.restLocation
      restaurant.phone = options.restPhone
      restaurant.google_map = options.restGoogleMap
      restaurant.rating = options.restRating
      restaurant.description = options.restDescription
      return restaurant.save()
    })
    .then(() => res.redirect(`/${restaurantId}/edit/succeed`))
    .catch(err => console.log(err))
})

// delete restaurant list
router.delete('/:restaurantId', (req, res) => {
  const { restaurantId } = req.params
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router