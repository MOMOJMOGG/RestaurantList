const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const RestaurantModel = require('./models/restaurant')

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
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
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
  RestaurantModel.find()
    .lean()
    .then(restaurantList => {
      const restaurant = restaurantList.find(rest => rest.id.toString() === req.params.restaurantId)
      res.render('show', { restaurant: restaurant })
    })
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

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})