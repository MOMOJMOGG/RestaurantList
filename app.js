const express = require('express')
const exphbs = require('express-handlebars')
const hbshelpers = require("handlebars-helpers")
const methodOverride = require('method-override')
const session = require('express-session')
const routes = require('./routes') // 引用路由器
require('./config/mongoose') // 引用資料庫

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const multihelpers = hbshelpers()
const app = express()
const PORT = process.env.PORT

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

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true
}))

// 將 request 導入路由器
app.use(routes)


// listening
app.listen(PORT, () => {
  console.log(`App is running on http://localhost:${PORT}.`)
})