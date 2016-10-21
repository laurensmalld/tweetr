"use strict";

const MongoClient = require("mongodb").MongoClient;
const MONGODB_URI = "mongodb://127.0.0.1/tweeter";

//const initialTweets = require("./tweets");

console.log(`Connecting to MongoDB running at: ${MONGODB_URI}`);

let db;


module.exports = {

  connect: (onConnect) => {

    MongoClient.connect(MONGODB_URI, (err, mongoInstance) => {
   if (err) {
      console.log('Could not connect! Unexpected error. Details below.');
      throw err;
    }

    console.log('Connected to the database!');

    db = mongoInstance

  const dbMethods = {
    saveTweet: (data, cb) => {
      let collection = db.collection("tweets");
      collection.insertOne(data);
      console.log(cb);
      return true;
    },

    getTweets: (cb) => {
      let collection = db.collection("tweets");
      return collection.find().toArray(function (err, results) {
        results.sort(function(a, b) { return a.created_at - b.created_at });
        cb(results);
      });
    }

  }

  onConnect(dbMethods);

});



  }

}
