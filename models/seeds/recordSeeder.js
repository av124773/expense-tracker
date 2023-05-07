const bcrypt = require('bcryptjs')
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
const Category = require('../category')
const Record = require('../record')
const User = require('../user')
const db = require('../../config/mongoose')

const SEED_USER = {
    name: 'User1',
    email: 'user1@example.com',
    password: '12345678'
  }
const SEED_RECORD = [
  {
    name: '午餐',
    date: '2019-04-23',
    stringDate: '2019-04-23',
    amount: 60,
    category: '餐飲食品'
  },
  {
    name: '晚餐',
    date: '2019-04-23',
    stringDate: '2019-04-23',
    amount: 60,
    category: '餐飲食品'
  },
  {
    name: '捷運',
    date: '2019-04-23',
    stringDate: '2019-04-23',
    amount: 120,
    category: '交通出行'
  },
]

db.on('error', () => {
  console.log('mongoose error!')
})

db.once('open', async () => {
  const userRecord = []
  const findCategory = []
  const getSalt = await bcrypt.genSalt(10)
  const getHash = await bcrypt.hash(SEED_USER.password, getSalt)
  const createdUser = await User.create({
    name: SEED_USER.name,
    email: SEED_USER.email,
    password: getHash,
  })
  console.log('created user!')

  for (let i = 0; i < SEED_RECORD.length; i++) {
    findCategory.push(await Category.findOne({ name: SEED_RECORD[i].category }))  
  }

  SEED_RECORD.forEach((record, index) => {
    record.userId = createdUser._id
    record.categoryId = findCategory[index]._id
    userRecord.push(record)
  })
  await Record.create(userRecord)
  console.log('created record!')

  console.log('CategorySeeder done')
  process.exit()
})