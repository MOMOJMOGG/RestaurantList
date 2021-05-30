// 引用 Express 與 Express 路由器
const express = require('express')
const router = express.Router()
// 引用 Todo model
const RestaurantModel = require('../../models/restaurant')
const regex = require('../../public/javascripts/regex')

// render new page
router.get('/new', (req, res) => {
  return res.render('new')
})

// create new restaurant list
router.post('/new', (req, res) => {
  const userId = req.user._id
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const errors = []
  if (!name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    errors.push({ message: '有必填欄位為空白。' })
  }
  if (!regex.matchEnglishName(name_en)) {
    errors.push({ message: '餐廳英文名稱含有非英文字元!' })
  }
  if (!regex.matchPhone(phone)) {
    errors.push({ message: '電話含有非數字字元!' })
  }
  if (errors.length) {
    return res.render('new', {
      errors,
      name,
      name_en,
      category,
      image,
      location,
      phone,
      google_map,
      rating,
      description
    })
  }
  // const createSucceed = true
  return RestaurantModel.create({
    name,
    name_en,
    category,
    image,
    location,
    phone,
    google_map,
    rating,
    description,
    userId
  })
    .then(() => {
      req.flash('success_msg', '餐廳新增成功')
      res.redirect('/')
    })
    .catch(err => console.log(err))
})

// dynamic router using params
router.get('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const { restaurantId } = req.params
  return RestaurantModel.findOne({ _id: restaurantId, userId })
    .lean()
    .then((restaurant) => res.render('show', { restaurant }))
    .catch(err => console.log(err))
})

// render edit restaurant list
router.get('/:restaurantId/edit', (req, res) => {
  const userId = req.user._id
  const { restaurantId } = req.params
  return RestaurantModel.findOne({ _id: restaurantId, userId })
    .lean()
    .then((restaurant) => res.render('edit', { restaurant }))
    .catch(err => console.log(err))
})

// edit restaurant list
router.put('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const { restaurantId } = req.params
  const { name, name_en, category, image, location, phone, google_map, rating, description } = req.body
  const errors = []
  if (!name || !name_en || !category || !image || !location || !phone || !google_map || !rating || !description) {
    errors.push({ message: '有必填欄位為空白。' })
  }
  if (!regex.matchEnglishName(name_en)) {
    errors.push({ message: '餐廳英文名稱含有非英文字元!' })
  }
  if (!regex.matchPhone(phone)) {
    errors.push({ message: '電話含有非數字字元!' })
  }
  if (errors.length) {
    req.flash('errors', errors)
    return res.redirect(`/restaurants/${restaurantId}/edit`)
  }

  return RestaurantModel.findOne({ _id: restaurantId, userId })
    .then(restaurant => {
      restaurant.name = name
      restaurant.name_en = name_en
      restaurant.category = category
      restaurant.image = image
      restaurant.location = location
      restaurant.phone = phone
      restaurant.google_map = google_map
      restaurant.rating = rating
      restaurant.description = description
      return restaurant.save()
    })
    .then(() => {
      req.flash('success_msg', '餐廳更新成功, 可繼續更新或回到首頁!')
      res.redirect(`/restaurants/${restaurantId}/edit`)
    })
    .catch(err => console.log(err))
})

// delete restaurant list
router.delete('/:restaurantId', (req, res) => {
  const userId = req.user._id
  const { restaurantId } = req.params
  return RestaurantModel.findOne({ _id: restaurantId, userId })
    .then(restaurant => restaurant.remove())
    .then(() => {
      req.flash('success_msg', '餐廳刪除成功')
      res.redirect('/')
    })
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router