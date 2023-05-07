const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')
const category = require('../../models/category')

router.get('/', async (req, res) => {
  try {
    const userRecord = await Record.find().lean().sort({ _id: 'asc' })
    let totalAmount = 0
    for (let record of userRecord) {
      const getCategory = await category.findById(record.categoryId)
      record.icon = getCategory.icon
      totalAmount += record.amount
    }
    console.log(userRecord)
    res.render('index', { record: userRecord, totalAmount })
  } catch (e) {
    console.log(e)
  }
})

module.exports = router