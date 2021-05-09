const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require("handlebars-helpers")
const RestaurantModel = require('./models/restaurant')
const methodOverride = require('method-override')
const multihelpers = hbshelpers()

const app = express()
const port = 3000

app.use(express.urlencoded({
  extended: true
}));

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// setting static files
app.use(express.static('public'))

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('errer', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})



// home page
app.get('/', (req, res) => {
  RestaurantModel.find()
    .lean()
    .then(restaurantList => res.render('index', { restaurants: restaurantList }))
    .catch(err => console.log(err))
})

// dynamic router using params
app.get('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(err => console.log(err))
})

// query searching
app.get('/search', (req, res) => {
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
app.get('/new', (req, res) => {
  return res.render('new')
})

// create new restaurant list
app.post('/new/create', (req, res) => {
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

// render edit restaurant list
app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(err => console.log(err))
})

// render edit succeed page
app.get('/restaurants/:restaurantId/edit/succeed', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant, createSucceed: true }))
    .catch(err => console.log(err))
})

// edit restaurant list
app.put('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  const options = req.body
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = options.restName,
        restaurant.name_en = options.restNameEn,
        restaurant.category = options.restCategory,
        restaurant.image = options.restImage,
        restaurant.location = options.restLocation,
        restaurant.phone = options.restPhone,
        restaurant.google_map = options.restGoogleMap,
        restaurant.rating = options.restRating,
        restaurant.description = options.restDescription
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}/edit/succeed`))
    .catch(err => console.log(err))
})

// delete restaurant list
app.delete('/restaurants/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

// listening
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})