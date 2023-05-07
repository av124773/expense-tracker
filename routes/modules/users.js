const express = require('express')
const passport = require('passport')
const router = express.Router()

const User = require('../../models/user')

router.get('/login', (req, res) => {
  res.render('login')
})

router.post('/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/users/login'
}))

router.get('/register', (req, res) => {
  res.render('register')
})

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, confirmPassword } = req.body
    const checkEmail = await User.findOne({ email })
    if (checkEmail) {
      console.log('Email already exists.')
      return res.render('register', {
        name,
        email,
        password,
        confirmPassword
      })
    } else {
      console.log('you can use this email')
      await User.create({
        name,
        email,
        password
      })
    }
    res.redirect('/')
  } catch (e) {
    console.log(e)
  }
})

module.exports = router