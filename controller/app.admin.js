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
		db.collection('hospDepartment').find().toArray(function (err, result) {
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
		db.collection('hospDepartment').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
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

  const authUsersData = function (field, mail, password) {
	return new Promise((resolve, reject) => {
		var records = [];
		// console.log("field:" + field);
		// console.log("email:" + email);
  
		MongoClient.connect(url, {
			useNewUrlParser: true
		}, function (err, client) {
			assert.equal(null, err);
			const db = client.db(dbName);
			db.collection('hospDepartment').find({
				[field]: {
					'$regex': mail,
					'$options': 'i'
				}
			}).toArray(function (err, result) {
				if (err) throw err
				console.log("result:" + JSON.stringify(result));
				// console.log("==========password:" + result[0]['password']);
  
				if ((mail===result[0]['mail']) && (password === result[0]['password'])) {
					// resolve(1);
					resolve(result);
				} else {
					resolve(0)
  
				}
				client.close();
			});
		});
	});
  }

module.exports = { getAdminData, getAdminDataById, addAdminData, authUsersData };