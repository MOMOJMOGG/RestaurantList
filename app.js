const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require("handlebars-helpers")
const RestaurantModel = require('./models/restaurant')
const methodOverride = require('method-override')
const multihelpers = hbshelpers()
// 引用路由器
const routes = require('./routes')
const app = express()
const port = 3000

// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'))

// setting static files
app.use(express.static('public'))

// set template engine
app.engine('hbs', exphbs({ defaultLayout: 'main', extname: '.hbs', helpers: multihelpers }))
app.set('view engine', 'hbs')

app.use(express.urlencoded({
  extended: true
}));


// 將 request 導入路由器
app.use(routes)



const mongoose = require('mongoose')
mongoose.connect('mongodb://localhost/restaurant-list', { useNewUrlParser: true, useUnifiedTopology: true })

const db = mongoose.connection

db.on('errer', () => {
  console.log('mongodb error')
})

db.once('open', () => {
  console.log('mongodb connected!')
})





// listening
app.listen(port, () => {
  console.log(`App is running on http://localhost:${port}.`)
})