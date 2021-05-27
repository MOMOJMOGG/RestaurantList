const Rest = require('../restaurant') // 載入 restaurant model
const restaurantList = require('./restaurant.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  console.log('mongodb connected!')
  restaurantList.results.forEach(info => {
    Rest.create({
      name: info.name,
      name_en: info.name_en,
      category: info.category,
      image: info.image,
      location: info.location,
      phone: info.phone,
      google_map: info.google_map,
      rating: info.rating,
      description: info.description
    })
  })

  console.log('Seeder Creating Finished!')
})