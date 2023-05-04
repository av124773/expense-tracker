const mongoose = require('mongoose')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
const db = mongoose.connection

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
const SEED_CATEGORY = []

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', async () => {
  Object.keys(CATEGORY).forEach((item, index) => {
    SEED_CATEGORY.push({
      id: index,
      name: item,
      image: CATEGORY[item]
    })
  })
  for(const item of SEED_CATEGORY) {
    await Category.create({
      ...item
    })
  }
  console.log('CategorySeeder done')
  process.exit()
})