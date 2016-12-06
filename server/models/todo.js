const mongoose = require('mongoose');

var Todo = mongoose.model('Todo', {
  text: {
    type: String,
    required: true,
    minlength: 1,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  completedAt: {
    type: Number,
    default: null
  }
});

// var otherTodo = new Todo({
//   text: '  Edit this video    '
// });
//
// otherTodo.save().then((doc) => {
//   console.log(doc);
// }, (err) => {
//   console.log('Unable to save doc', err)
// });

module.exports = { Todo };
