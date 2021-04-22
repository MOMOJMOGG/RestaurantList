const express = require('express')
const exphbs = require('express-handlebars')
const app = express()
const port = 3000
const restaurantList = require('./restaurant.json')

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs' }))
app.set('view engine', 'hbs')

// setting static files
app.use(express.static('public'))

app.get('/', (req, res) => {
  // pass the restaurant data into 'index' partial template
  res.render('index', { restaurants: restaurantList.results })
})

// dynamic router using params
app.get('/restaurants/:restaurant_id', (req, res) => {
  const restaurant = restaurantList.results.find(rest => rest.id.toString() === req.params.restaurant_id)
  res.render('show', { restaurant: restaurant })
})

// query searching
app.get('/search', (req, res) => {
  const restaurants = restaurantList.results.filter((rest) => {
    return rest.name_en.toLowerCase().includes(req.query.keyword.toLowerCase()) || rest.name.toLowerCase().includes(req.query.keyword.toLowerCase())
  })
  res.render('index', { restaurants: restaurants, keyword: req.query.keyword })
})

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})