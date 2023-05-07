const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
// const category = require('../../models/category')

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
    let userSort = sortType[0]
    const sort = req.query.sort
    if (sort) {
      userSort = sortType[sort]
      console.log(req.query)
    } 
    
    const userId = req.user._id
    const userRecord = await Record.find({ userId }).lean().sort(userSort)
    let totalAmount = 0
    for (let record of userRecord) {
      const getCategory = await Category.findById(record.categoryId)
      record.icon = getCategory.icon
      totalAmount += record.amount
    }
    res.render('index', { record: userRecord, totalAmount })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router