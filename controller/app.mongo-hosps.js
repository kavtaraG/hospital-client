const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const ObjectId = require('mongodb').ObjectID;
const HospsSchema = require('../models/pharmacy');
const mongoose = require('mongoose');

const dbName = 'pharmdb';
const url = 'mongodb://localhost:27017';


const getMongoData = function(){ 
	return new Promise((resolve, reject) => {
	MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true},
	  function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hosps').find().toArray(function (err, result) {
		  if (err) throw err
		  //console.log(result);
		  client.close();
		  resolve(result);
		});
	});
	});
  };

const getMongoDataById = function(id){
	return new Promise((resolve, reject) => {
	var record = {};
	  console.log(">> getDataById "+ id);
	  MongoClient.connect(url,{ useNewUrlParser: true,useUnifiedTopology: true }, function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hosps').find({"_id" : ObjectId(id)}).toArray(function (err, result) {
		  if (err) throw err
		  console.log(result);
		  resolve(result[0]);
		  client.close();
		});
		});
	});
  };

  const addMongoData = function(record) {
	return new Promise((resolve, reject) => {
	MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
	  const collection = db.collection('hosps');
	  collection.insertMany([record],function(err,result){
		resolve({result:'success'});
		client.close();
	  });
	  });
	});
  };

  const updateMongoData = function(customer){
	// console.log("Custimer is ",customer);
	return new Promise((resolve, reject) => {
	  let id = customer.id;
	  delete(customer.id);
	  MongoClient.connect(url, { useNewUrlParser: true,useUnifiedTopology: true },function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
	  const collection = db.collection('hosps');
	  collection.updateOne({"_id" : ObjectId(id)},{ $set: customer },function(err,result){
		resolve({result:'success'});
		client.close();
		 });
	  });
	});
  };
  

  const getMongoDataBySearch = function(field,searchText){
	return new Promise((resolve, reject) => {
	  var records = [];
	  //searhObject[searchParam.field] = "/"+searchParam.searchword+"/i";
	  //console.log("search ==> "+JSON.stringify(searchParam));
	  console.log("field:"+field);
	  console.log("searchText:"+searchText);
  
	  MongoClient.connect(url,{ useNewUrlParser: true }, function(err, client) {
	  assert.equal(null, err);
	  const db = client.db(dbName);
		db.collection('hosps').find({[field]:{'$not':{'$regex' : searchText, '$options' : 'x'}}}).toArray(function (err, result) {
		  if (err) throw err;
		  console.log("result:"+JSON.stringify(result));
		  resolve(result);
		  client.close();
		   });
		});
	});
  };

  const authUsers = function (field, username, password) {
	return new Promise((resolve, reject) => {
		var records = [];
		// console.log("field:" + field);
		// console.log("email:" + email);
  
		MongoClient.connect(url, {
			useNewUrlParser: true
		}, function (err, client) {
			assert.equal(null, err);
			const db = client.db(dbName);
			db.collection('users').find({
				[field]: {
					'$regex': username,
					'$options': 'i'
				}
			}).toArray(function (err, result) {
				if (err) throw err
				console.log("result:" + JSON.stringify(result));
				// console.log("==========password:" + result[0]['password']);
  
				if ((username===result[0]['username']) && (password === result[0]['password'])) {
					// resolve(1);
					resolve(result);
				} else {
					resolve(0)
  
				}
				client.close();
			});
		});
	});
  };

module.exports = { 
	getMongoData, 
	getMongoDataById, 
	addMongoData, 
	updateMongoData, 
	getMongoDataBySearch,
	authUsers 
};