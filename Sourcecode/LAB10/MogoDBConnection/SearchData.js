/*
 * Created by mnpw3d on 20/10/2016.
 */

var MongoClient = require('mongodb').MongoClient;
var assert = require('assert');
var url = 'mongodb://LAB10:LAB10@ds147920.mlab.com:47920/aselab10';
var findUser = function(db, callback) {
    var cursor =db.collection('lab10').find( );
    cursor.each(function(err, doc) {
        assert.equal(err, null);
        if (doc != null) {
            console.log(doc);
        } else {
            callback();
        }
    });
};
var findUserwithName = function(db,callback) {
    var cursor = db.collection('lab10').find({"fname":"Vijaya"});
    cursor.each(function(err,doc) {
        assert.equal(err,null);
        if(doc != null)
        {
            console.log("First Name:" + doc.fname);
            console.log("Last Name:" + doc.lname);
            console.log("city:" + doc.address.city);
        }
    });
}
var findUserwithUniversity = function(db, callback) {
    var cursor = db.collection('lab10').find({"education.university":"UMKC"});
    cursor.each(function(err,doc){
       assert.equal(err,null);
       if(doc != null)
       {
           console.log("First Name:" + doc.fname);
           console.log("University:" + doc.education.university);
           console.log("Degree:" + doc.education.degree);
           console.log("Major:" + doc.education.major);
           console.log("mail:" + doc.mail);
       }
    });
}
MongoClient.connect(url, function(err, db) {
    assert.equal(null, err);
    findUserwithUniversity(db, function() {
        db.close();
    });
});