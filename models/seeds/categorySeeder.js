const mongoose = require('mongoose')
const Category = require('../category')

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true })
const db = mongoose.connection

const CATEGORY = {
  家居物業: "https://fontawesome.com/icons/home?style=solid",
  交通出行: "https://fontawesome.com/icons/shuttle-van?style=solid",
  休閒娛樂: "https://fontawesome.com/icons/grin-beam?style=solid",
  餐飲食品: "https://fontawesome.com/icons/utensils?style=solid",
  其他: "https://fontawesome.com/icons/pen?style=solid"
}
const SEED_CATEGORY = Object.entries(CATEGORY).map((category, index) => {
  return { 
    name: category[0],
    image: category[1]
  }
})

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', async () => {
  for(const item of SEED_CATEGORY) {
    try {
      await Category.create({
        ...item
      })
    } catch (e) {
      console.log(e)
    }
  }
  console.log('CategorySeeder done')
  process.exit()
})