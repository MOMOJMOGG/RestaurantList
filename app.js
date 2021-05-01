const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require("handlebars-helpers")
const multihelpers = hbshelpers()

const app = express()
const port = 3000
const RestaurantModel = require('./models/restaurant')
const creatorScanner = require('./creatorScanner')

app.use(express.urlencoded({
  extended: true
}));

const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('errer', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

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

app.get('/new', (req, res) => {
  return res.render('new')
})

app.post('/new/create', (req, res) => {
  const options = req.body
  const results = creatorScanner(options)
  RestaurantModel.create({
    id: 8 + 1,
    name: results[0].restName,
    name_en: results[0].restNameEn,
    category: results[0].restCategory,
    image: results[0].restImage,
    location: results[0].restLocation,
    phone: results[0].restPhone,
    google_map: results[0].restGoogleMap,
    rating: results[0].restRating,
    description: results[0].restDescription
  })
    .then(() => res.render('new', { options: results[0], createSucceed: results[1] }))
    .catch(err => console.log(err))
})

app.get('/restaurants/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(err => console.log(err))
})

app.get('/restaurants/:restaurantId/edit/succeed', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant, createSucceed: true }))
    .catch(err => console.log(err))
})

app.post('/restaurants/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  const options = req.body
  const results = creatorScanner(options)
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => {
      restaurant.name = results[0].restName,
        restaurant.name_en = results[0].restNameEn,
        restaurant.category = results[0].restCategory,
        restaurant.image = results[0].restImage,
        restaurant.location = results[0].restLocation,
        restaurant.phone = results[0].restPhone,
        restaurant.google_map = results[0].restGoogleMap,
        restaurant.rating = results[0].restRating,
        restaurant.description = results[0].restDescription
      return restaurant.save()
    })
    .then(() => res.redirect(`/restaurants/${restaurantId}/edit/succeed`))
    .catch(err => console.log(err))
})

app.post('/restaurants/:restaurantId/delete', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})