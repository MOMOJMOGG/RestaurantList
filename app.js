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

app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})