const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Course = new Schema({
  name: {type:String,default:'haha'},
  description: String,

},{
  timestamps:true
});
module.exports  = mongoose.model('Course',Course)