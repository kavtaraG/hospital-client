// var express = require('express');
// var router = express.Router();

// const { getMongoData,  getMongoDataBySearch } = require('../controller/app.mongo-hosps');
// router.get('/', (req, res) => {
// 	res.redirect('/login');
//   });

// router.get('/', async function(req, res, next) {
// 	const user = {};
// 	res.render('index', { title: 'Express', data: await getMongoData(), user: data[0].username });
//   });
  
//   router.get('/search/:field/:searchWord', async function(req, res, next) {
// 	res.render('index', { title: 'Express', data: await getMongoDataBySearch(req.params.field, req.params.searchWord) });
//   });
  
//   router.get('/pharmacy', function(req, res, next) {
// 	res.render('pharm');
//   });
  
//   router.get('/table2/:select/:searchText', async function(req, res, next) {
// 	res.render('pharm', { data: await getMongoDataBySearch(req.params.select, req.params.searchText ) });
//   });

// module.exports = router;