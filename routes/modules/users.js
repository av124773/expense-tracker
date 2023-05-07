const express = require('express')
const passport = require('passport')
const bcrypt = require('bcryptjs')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login',
  failureFlash: true
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const checkEmail = await User.findOne({ email })
    const errors = []
    if ( password !== confirmPassword) {
      errors.push({ message: '密碼與確認密碼不相符!'})
    }
    if (checkEmail) {
      errors.push({ message: '這個信箱已經註冊過了!'})
    }
    if (errors.length) {
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword
      })
    }
    const getSalt = await bcrypt.genSalt(10)
    const getHash = await bcrypt.hash(password, getSalt)
    await User.create({
      name,
      email,
      password: getHash
    })
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
})

router.get('/logout', (req, res) => {
  req.logout()
  req.flash('success_msg', '你已經成功登出。')
  res.redirect('/users/login')
})

module.exports = router