const { ObjectID } = require('mongodb');

const { mongoose } = require('./../server/db/mongoose');
const { Todo } = require('./../server/models/todo');
const { User } = require('./../server/models/user');

// Available mongoose methods
// Todo.remove({})
// Todo.findOneAndRemove({})
// Todo.findByIdAndRemove('')


User.findByIdAndRemove('58472b702d62370dab1ef309').then((res) => {
  console.log(res);
});
