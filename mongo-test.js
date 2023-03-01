var MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017',{useUnifiedTopology: true}, function (err, client) {
	if(err) throw err;
	var db = client.db('pharmdb');
	db.collection('hosps').find().toArray( function (err, result) {
		if(err) throw err;
		console.log(result);
	})
})