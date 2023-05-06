
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = [
  {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678'
  }
]
const SEED_RECORD = [
  {
    name: '午餐',
    date: '2019-04-23',
    amount: 60
  },
  {
    name: '晚餐',
    date: '2019-04-23',
    amount: 60
  },
  {
    name: '捷運',
    date: '2019-04-23',
    amount: 120
  },
]
const SEED_CATEGORY = [
  { name: '餐飲食品' },
  { name: '餐飲食品' },
  { name: '交通出行' },
]

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', async () => {
  await Promise.all(
    SEED_USER.map(async (user, user_index) => {
      const createdUser = await User.create({
        ...user
      })
      console.log('created user!')

      const findCategory = []
      for (let i = 0; i < SEED_CATEGORY.length; i++) {
        findCategory.push(await Category.findOne({ name: SEED_CATEGORY[i].name }))  
      }
      
      const userRecord = []
      SEED_RECORD.forEach(async (record, index) => {
        record.userId = createdUser._id
        record.categoryId = findCategory[index]._id
        userRecord.push(record)
      })
      await Record.create(userRecord)
      console.log('created record!')
    })
  ).catch(e => console.log(e))

  console.log('CategorySeeder done')
  process.exit()
})