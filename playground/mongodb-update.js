// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // same as above 'ES6 desctructuring'

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // findOneAndUpdate
  // db.collection('Todos').findOneAndUpdate({
  //   _id: new ObjectID('5845e16f8bcd8b68feba8118')
  // }, {
  //   $set: {
  //     completed: true
  //   }
  // }, {
  //   returnOriginal: false
  // }).then((result) => {
  //   console.log(result);
  // })

  db.collection('Users').findOneAndUpdate({
    _id: new ObjectID("58451b88386200dc160bc9a9")
  }, {
    $set: {
      name: 'jen'
    },
    $inc: {
      age: -30
    }
  }, {
    returnOriginal: false
  }).then((res) => {
    console.log(res);
  })

  // db.close();
});
