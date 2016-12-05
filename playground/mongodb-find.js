// const MongoClient = require('mongodb').MongoClient;
const {MongoClient, ObjectID} = require('mongodb'); // same as above 'ES6 desctructuring'

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
  if (err) {
    return console.log('Unable to connect to MongoDB server');
  }
  console.log('Connected to MongoDB server');

  // db.collection('Todos').find({
  //   _id: new ObjectID('58451a754951dadb6c6be34b')
  // }).toArray().then((docs) => {
  //   console.log('Todos');
  //   console.log(JSON.stringify(docs, undefined, 2));
  // }, (err) => {
  //   console.log('Unable to fetch todos')
  // });

  db.collection('Users').find({name: 'Mark'}).toArray().then((doc) => {
    console.log(doc);
  }, (err) => {
    console.log('Unable to find docs')
  });

  // db.close();
});
