/**
 * Created by Vijaya Yeruva on 4/4/2017.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var bodyParser = require("body-parser");
var express = require('express');
var cors = require('cors');
var app = express();
var url = 'mongodb://LAB10:LAB10@ds147920.mlab.com:47920/aselab10';
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.post('/register', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        insertDocument(db, req.body, function() {
            res.write("Successfully inserted");
            res.end();
        });
    });
})
app.get('/get', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        db.collection('lab10').find().toArray(function(err, result){
            if(err)
            {
                res.write("get Failed");
                res.end();
            }
            else
            {
                res.send(JSON.stringify(result));
            }
            console.log("Got All Documents");
        });
    });



})
app.get('/update/:s_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};
        var newData={};
        if(req.params.s_id){
            find._id = new ObjectID(req.params.s_id);
        }

        if(req.query.fname){
            newData.fname = req.query.fname;
        }

        if(req.query.lname){
            newData.lname = req.query.lname;
        }

        if(req.query.mail){
            newData.mail = req.query.mail;
        }

        db.collection('lab10').update(find,{'$set':newData},
            function(err,result){
            if(err)
                throw err;
            else
                res.send("Update success !");
            });
        });
    })
app.get('/delete/:s_id', function (req, res) {
    MongoClient.connect(url, function(err, db) {
        if(err)
        {
            res.write("Failed, Error while connecting to Database");
            res.end();
        }
        var find={};
        if(req.params.s_id)
            find._id = new ObjectID(req.params.s_id);
        db.collection('lab10').remove(find,function(err,result){
            if(err)
                throw err;
            res.send('Delete Success');
        });
    });
})
var insertDocument = function(db, data, callback) {
    db.collection('lab10').insertOne( data, function(err, result) {
        if(err)
        {
            res.write("Registration Failed, Error While Registering");
            res.end();
        }
        console.log("Inserted a document into the lab10 collection.");
        callback();
    });
};
var server = app.listen(8081, function () {
    var host = server.address().address
    var port = server.address().port

    console.log("Example app listening at http://%s:%s", host, port)
})