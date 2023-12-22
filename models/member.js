const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;

const memberSchema = new Schema({
    name: String,
    relation: String,
    age: Number,
    hobby: [String],
    feelingSick: Boolean
},{
    timestamps: true
  });
  
// Compile the schema into a model and export it
module.exports = mongoose.model('Member', memberSchema);


