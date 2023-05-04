const mongoose = require('mongoose')
const Schema = mongoose.Schema
const recordSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    require: true
  },
  amount: {
    type: Number,
    require: true
  },
  // uerId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   index: true,
  //   required: true
  // },
  // categoryId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'Category',
  //   index: true,
  //   required: true
  // }
})
module.exports = mongoose.model('Record', recordSchema)