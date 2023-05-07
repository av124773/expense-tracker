
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const mongoose = require('mongoose')
const Category = require('../category')
const db = require('../../config/mongoose')

const CATEGORY = {
  家居物業: "fa-solid fa-house",
  交通出行: "fa-solid fa-van-shuttle",
  休閒娛樂: "fa-solid fa-face-grin",
  餐飲食品: "fa-solid fa-utensils",
  其他: "fa-solid fa-pen"
}
const SEED_CATEGORY = Object.entries(CATEGORY).map((category, index) => {
  return { 
    name: category[0],
    icon: category[1]
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
