const mongoose = require('mongoose')
const Schema = mongoose.Schema
const categorySchema = new Schema({
  name: {
    type: String,
    required: true
  },
  // 要不要放 img 考慮中
  // img: {
  //   type: String,
  //   required: true
  // }
})
module.exports = mongoose.model('Category', categorySchema) 