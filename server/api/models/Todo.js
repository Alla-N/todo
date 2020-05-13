const {Schema, model} = require('mongoose');


const TodoSchema = new Schema({
  userId: {type: String, required: true},
  title: {type: String, required: true},
  completed: {type: Boolean, required: true},
  deadline: {type: String, required: true},
  priority: {type: String, required: true},
});


module.exports = model('Todo', TodoSchema);
