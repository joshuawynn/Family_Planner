const mongoose = require('mongoose');
// optional shortcut to the mongoose.Schema class
const Schema = mongoose.Schema;


const taskSchema = new Schema({
  content: String, 
  taskDate: {
    type: Date
  }
},{
  timestamps: true
});

const scheduleSchema = new Schema({
  content: String, 
  scheduleDate:{
    type: Date
  }
},{
  timestamps: true
});


const memberSchema = new Schema({
    name: String,
    relation: String,
    age: Number,
    hobby: [String],
    feelingSick: Boolean,
    tasks: [taskSchema],
    schedules: [scheduleSchema]
},{
    timestamps: true
  });
  
// Compile the schema into a model and export it
module.exports = mongoose.model('Member', memberSchema);


