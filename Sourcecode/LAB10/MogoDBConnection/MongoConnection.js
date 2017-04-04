/**
 * Created by mnpw3d on 20/10/2016.
 */
var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://LAB10:LAB10@ds147920.mlab.com:47920/aselab10';
MongoClient.connect(url, function(err, db) {
  assert.equal(null, err);
  console.log("Connected correctly to server.");
  db.close();
});