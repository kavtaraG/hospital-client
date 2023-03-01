const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const dotenv = require('dotenv');

dotenv.config({path: '../config.env'});

// const url = process.env.URI;
const url = 'mongodb://localhost:27017'
// const dbName = process.env.DBNAME;
const dbName = 'pharmdb';
// const collname = process.env.COLLNAME;

const getAdminData = function(){ 
	return new Promise((resolve, reject) => {
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
	  function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hostDepartment').find().toArray(function (err, result) {
		  if (err) throw err
		  //console.log(result);
		  client.close();
		  resolve(result);
		});
	});
	});
  };

  const getAdminDataById = function(id){
	return new Promise((resolve, reject) => {
	var record = {};
	  console.log(">> getDataById "+ id);
	  MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hostDepartment').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
		  if (err) throw err
		  console.log(result);
		  resolve(result[0]);
		  client.close();
		});
		});
	});
  };

  const addAdminData = function(record) {
	return new Promise((resolve, reject) => {
	MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
	  const collection = db.collection('hospDepartment');
	  collection.insertMany([record],function(err,result){
		resolve({result:'success'});
		client.close();
	  });
	  });
	});
  };

module.exports = { getAdminData, getAdminDataById, addAdminData };