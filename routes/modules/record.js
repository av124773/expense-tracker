const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async(req, res) => {
  // 登入還沒做，userId 先用之前生成的資料擋一下
  const userId = "6455f9acabe6bc4b78307209"
  const { name, date, category, amount } = req.body
  try {
    const getCategory = await Category.findOne({ name: category })
    console.log(getCategory)
    await Record.create({
      name,
      date,
      amount,
      userId: userId,
      categoryId: getCategory._id
    })
  } catch {
    console.log(error)
  }
  res.redirect('/')
})

module.exports = router