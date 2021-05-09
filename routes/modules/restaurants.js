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
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('show', { restaurant: restaurant }))
    .catch(err => console.log(err))
})

// render edit restaurant list
router.get('/:restaurantId/edit', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant }))
    .catch(err => console.log(err))
})

// render edit succeed page
router.get('/:restaurantId/edit/succeed', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .lean()
    .then((restaurant) => res.render('edit', { restaurant: restaurant, createSucceed: true }))
    .catch(err => console.log(err))
})

// edit restaurant list
router.put('/:restaurantId', (req, res) => {
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
    .then(() => res.redirect(`/${restaurantId}/edit/succeed`))
    .catch(err => console.log(err))
})

// delete restaurant list
router.delete('/:restaurantId', (req, res) => {
  const restaurantId = req.params.restaurantId
  return RestaurantModel.findById(restaurantId)
    .then(restaurant => restaurant.remove())
    .then(() => res.redirect('/'))
    .catch(error => console.log(error))
})


// 匯出路由模組
module.exports = router

//**** A6 : Should You Use exec() with await issue ****//
// 第一種方法 : 由於 DB 操作是非同步處理，因此程式會先執行到 restaurantNameout 輸出為 空字串
//             在第二個 then 的 restaurantName 因為是等待 DB 處理完成後所執行的步驟，因此會有正確答案
// console.log Ans:
// restaurantNamerr
// restaurantName ZIGA ZIGA


// router.get('/:restaurantId', (req, res) => {
//   const restaurantId = req.params.restaurantId;
//   let restaurantName = "";
//   RestaurantModel.findById(restaurantId)
//     .lean()
//     .then((restaurant) => {
//       restaurantName = restaurant.name;
//       return restaurant;
//     })
//     .then((restaurant) => {
//       console.log("restaurantName", restaurantName);
//       res.render('show', { restaurant: restaurant })
//     })
//     .catch(err => console.log(err))
//   console.log("restaurantNameout", restaurantName)
// })

// 第一種方法正確使用如下，使用 return 等非同步完成後，跳出路由執行函式
// console.log Ans:
// restaurantName ZIGA ZIGA

// router.get('/:restaurantId', (req, res) => {
//   const restaurantId = req.params.restaurantId;
//   let restaurantName = "";
//   return RestaurantModel.findById(restaurantId)
//     .lean()
//     .then((restaurant) => {
//       restaurantName = restaurant.name;
//       return restaurant;
//     })
//     .then((restaurant) => {
//       console.log("restaurantName", restaurantName);
//       res.render('show', { restaurant: restaurant })
//     })
//     .catch(err => console.log(err))
// })

//=================================================================
// 第二種方法: 使用 await 方法取出 非同步資料
//            注意 await 必須要放在 async 函式內部 https://stackoverflow.com/questions/50518069/await-is-only-valid-in-async-function-when-using-mongoosejs-exec
//            要使用 return 把 restaurant 回傳出來, 若使用 .find.lean()則會取出所有的資料
//            由於 await 確保 DB 處理完畢才回傳資料, 因此 restaurantName 有被更新成功才去輸出
// console.log Ans:
//restaurant { _id: 608e670b6e1fdd3a0cb6d714,
// name: 'ZIGA ZIGA',
//   name_en: 'Ziga Zaga',
//     category: '義式餐廳',
//       image:
// 'https://assets-lighthouse.s3.amazonaws.com/uploads/image/file/5629/03.jpg',
//   location: '台北市信義區松壽路 2 號',
//     phone: '02 2720 1230',
//       google_map: 'https://goo.gl/maps/bnZKC2YjYZp',
//         rating: 4.2,
//           description:
// '以頂級食材與料理技法完美呈現各類經典義式料理，獅頭造型烤爐現作pizza與開放式廚房現作龍蝦茄汁雞蛋銀絲麵是不可錯過
// 的必嚐推薦！夜間國際級樂團的熱力演出，感受活力四射的現場魅力。',
// __v: 0 }
// restaurantName ZIGA ZIGA


// router.get('/:restaurantId', async (req, res) => {
//   const restaurantId = req.params.restaurantId
//   let restaurantName = ""

//   const restaurant = await RestaurantModel.findById(restaurantId)
//     .lean().then((restaurant) => {
//       restaurantName = restaurant.name
//       return restaurant
//     })
//     .catch(err => console.log(err))

//   console.log("restaurant", restaurant)
//   console.log("restaurantName", restaurantName)
// })

//======================================================================
// 第三種 : 使用 await 搭配 exec() 使用 https://mongoosejs.com/docs/promises.html#should-you-use-exec-with-await?
//         使用 exec() 可以取得 promise 物件, 再用這個 promise 物件去執行 then() 的後續 
// console.log Ans: 同方法二
// router.get('/:restaurantId', async (req, res) => {
//   const restaurantId = req.params.restaurantId
//   let restaurantName = ""

//   const restaurantCMD = RestaurantModel.findById(restaurantId).lean()

//   const promise = restaurantCMD.exec()

//   const restaurant = await promise.then((rest) => {
//     restaurantName = rest.name
//     return rest
//   })

//   console.log("restaurant", restaurant)
//   console.log("restaurantName", restaurantName)
//   res.render('show', { restaurant: restaurant })
// })