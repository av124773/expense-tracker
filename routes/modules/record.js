const express = require('express')
const router = express.Router()

const Record = require('../../models/record')
const Category = require('../../models/category')


function DateToString(date) {
  // getMonth() 是從 0 開始計算的所以要 +1
  const mm = (date.getMonth() + 1).toString() 
  const dd = date.getDate().toString() 
  return [
    date.getFullYear(), '-',              // year
    mm.length === 2 ? '' : '0', mm, '-',  // month
    dd.length === 2 ? '' : '0', dd        // date
  ].join('')
}

router.get('/new', (req, res) => {
  return res.render('new')
})

router.post('/', async(req, res) => {
  try {
    // 登入還沒做，userId 先用之前生成的資料擋一下
    const userId = req.user._id
    const { name, date, category, amount } = req.body
    const getCategory = await Category.findOne({ name: category })

    await Record.create({
      name,
      date,
      stringDate: date,
      amount,
      userId: userId,
      categoryId: getCategory._id
    })
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
})

router.get('/:id/edit', async (req, res) => {
  const _id = req.params.id
  const userId = req.user._id
  const userRecord = await Record.findOne({ _id, userId }).lean()
  const userCategory = await Category.findById(userRecord.categoryId).lean()
  const userRecoreDate = DateToString(userRecord.date)

  res.render('edit', { record: userRecord, category: userCategory, date: userRecoreDate })
})

router.put('/:id', async(req, res) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const { name, date, category, amount } = req.body 
    const userRecord = await Record.findOne({ _id, userId })
    const getCategory = await Category.findOne({ name: category })

    userRecord.name = name
    userRecord.date = date
    userRecord.stringDate = date
    userRecord.category = getCategory.name
    userRecord.amount = amount
    userRecord.categoryId = getCategory._id

    await userRecord.save()

    res.redirect(`/`)
  } catch (e) {
    console.log(e)
  }
})

router.delete('/:id', async (req, res) => {
  try {
    const _id = req.params.id
    const userId = req.user._id
    const userRecord = await Record.findOne({ _id, userId})

    await userRecord.remove()

    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router
