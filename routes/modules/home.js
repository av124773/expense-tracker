const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

// const sortType = [
//   { _id: 'asc' },
//   { date: 'asc' },
//   { date: 'desc' },
//   { category: 'asc' },
//   { amount: 'asc' },
//   { amount: 'desc' }
// ]

const sortType = [
  { _id: 'asc' },
  { date: 'asc' },
  { date: 'desc' },
  { category: 'asc' },
  { amount: 'asc' },
  { amount: 'desc' }
]

router.get('/', async (req, res) => {
  try {
    const userId = req.user._id
    const selectedCategory = req.query.category
    let getCategoryId = ''
    let userRecord = ''
    if (selectedCategory) {
      getCategoryId = await Category.find({ name: selectedCategory })
      userRecord = await Record.find({ userId, categoryId: getCategoryId }).lean().sort({ _id: 'asc' })
    } else {
      userRecord = await Record.find({ userId }).lean().sort({ _id: 'asc' })
    }

    let totalAmount = 0
    for (let record of userRecord) {
      const getCategoryIcon = await Category.findById(record.categoryId)
      record.icon = getCategoryIcon.icon
      totalAmount += record.amount
    }
    res.render('index', { record: userRecord, totalAmount, selectedCategory })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router