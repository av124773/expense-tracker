const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

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
    const userRecord = await Record.find({ userId }).lean().sort({ _id: 'asc' })
    let totalAmount = 0
    for (let record of userRecord) {
      const getCategory = await category.findById(record.categoryId)
      record.icon = getCategory.icon
      totalAmount += record.amount
    }
    res.render('index', { record: userRecord, totalAmount })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router