const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/', (req, res) => {
  Record.find()
    .lean()
    .sort({ _id: 'asc' }) // desc
    .then(record => res.render('index', { record }))
    .catch(error => console.error(error))
})

module.exports = router