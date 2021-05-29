const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

const Rest = require('../restaurant') // 載入 restaurant model
const User = require('../user')
const restaurantList = require('./restaurant.json')
const userList = require('./raw_user.json')

const db = require('../../config/mongoose')

db.once('open', () => {
  const restSeedList = {
    "user1": restaurantList.results.slice(0, 3),
    "user2": restaurantList.results.slice(3, 6)
  }
  return Promise
    .all(Array.from({ length: userList.users.length }, (_, i) => {
      return bcrypt
        .genSalt(10)
        .then(salt => bcrypt.hash(userList.users[i].password, salt))
        .then(hash => User.create({
          name: userList.users[i].name,
          email: userList.users[i].email,
          password: hash
        }))
        .then(user => {
          const userId = user._id
          return Promise.all(Array.from({ length: 3 }, (_, i) => {
            const rest = restSeedList[user.name][i]
            return Rest.create({
              name: rest.name,
              name_en: rest.name_en,
              category: rest.category,
              image: rest.image,
              location: rest.location,
              phone: rest.phone,
              google_map: rest.google_map,
              rating: rest.rating,
              description: rest.description,
              userId
            })
          }))
        })
    }))
    .then(() => {
      console.log('Seeder Creating Finished!')
      process.exit()
    })
})