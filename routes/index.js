const express = require('express')
const router = express.Router()

const home = require('./modules/home')
const users = require('./modules/users')
const record = require('./modules/record')


router.use('/', home)
router.use('/record', record)
router.use('/users', users)

module.exports = router