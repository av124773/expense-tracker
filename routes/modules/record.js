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
  } catch (e) {
    console.log(e)
  }
  res.redirect('/')
})

router.get('/:id/edit', async (req, res) => {
  const id = req.params.id
  const userRecord = await Record.findById(id).lean()
  const userCategory = await Category.findById(userRecord.categoryId).lean()
  const userRecoreDate = DateToString(userRecord.date)

  res.render('edit', { record: userRecord, date: userRecoreDate, category: userCategory })
})

router.put('/:id', async(req, res) => {
  const id = req.params.id
  const { name, date, category, amount } = req.body 
  try {
    const getCategory = await Category.findOne({ name: category })
    const getRecord = await Record.findById(id)

    getRecord.name = name
    getRecord.date = date
    getRecord.category = getCategory
    getRecord.amount = amount

    await getRecord.save()
  } catch (e) {
    console.log(e)
  }
  res.redirect(`/`)
})

router.delete('/:id', async (req, res) => {
  const id = req.params.id
  try {
    const userRecord = await Record.findById(id)

    await userRecord.remove()
  } catch (e) {
    console.log(e)
  }
  
  res.redirect('/')
})

module.exports = router
