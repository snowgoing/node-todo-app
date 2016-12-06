const mongoose = require('mongoose');

var User = mongoose.model('User', {
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1
  }
});

// var newUser = new User({
//     email: 'snowgoing@gmail.com'
// });
//
// newUser.save().then((user) => {
//   console.log(user);
// }, (e) => {
//   console.log('Unable to save user', e)
// });

module.exports = { User };
