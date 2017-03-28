const mongoose = require('mongoose');
const validator = require('validator');
const jwt = require('jsonwebtoken');
const _ = require('lodash');
var bcrypt = require('bcryptjs');

var UserSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    trim: true,
    minlength: 1,
    unique: true,
    validate: {
      validator: validator.isEmail,
      message: '{VALUE} is not a valid email'
    }
  },
  password: {
    type: String,
    required: true,
    minlength: 6
  },
  tokens: [{
    access: {
      type: String,
      required: true
    },
    token: {
      type: String,
      required: true
    }
  }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id', 'email']);
};

// Instance method ( .methods )
UserSchema.methods.generateAuthToken = function () {
  var user = this; // Instance methods get called with individual document
  var access = 'auth';
  var token = jwt.sign({ _id: user._id.toHexString(), access }, 'abc123').toString();

  user.tokens.push({ access, token });

  return user.save().then(() => {
    return token;
  });
};

// Model method ( .statics )
UserSchema.statics.findByToken = function (token) {
  var User = this; // Model methods get called with the Model as the 'this' binding
  var decoded;

  try {
    decoded = jwt.verify(token, 'abc123');
  } catch (e) {
    return Promise.reject(); // reject(value) value will be e arg catch
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

UserSchema.statics.findByCredentials = function (email, password) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, user.password, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

// Mongoose middleware
UserSchema.pre('save', function (next) {
  var user = this;
  if (user.isModified('password')) {
    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(user.password, salt, (err, hash) => {
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }

});

var User = mongoose.model('User', UserSchema);

module.exports = { User };
