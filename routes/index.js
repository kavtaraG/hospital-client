var express = require('express');
var router = express.Router();
const fs = require('fs');
const session = require('cookie-session');

const { getMongoData,  getMongoDataBySearch } = require('../controller/app.mongo-hosps');
const { getData } = require('../controller/app.controller');
//const { getArminData } = require('../controller/app.admin-data');
const { getAdminData, getAdminDataById, addAdminData } = require('../controller/app.admin');

let dataJson = JSON.parse(fs.readFileSync(`${__dirname}/../public/data.json`));
let dataMap = dataJson.map((item) => (dataJson, item));

/* GET home page. */
// router.get('/', (req, res) => {
//   res.redirect('/login');
// });

// const authAdmin = () => {
//   return (req, res, next) => {
//     if(res.session.role != 'admin'){
//       res.status(401);
//       res.redirect('/admin_pages');
//       return res.send('Mot allowded');
//     };
//     next();
//   };
// };

// const authUsers = () => {
//   return (req, res, next) => {
//     if(req.session.role != 'user'){
//       res.status(401);
//       res.redirect('/login');
//       return res.send('Not allowded');
//     };
//     next();
//   };
// };

router.get('/login', function(req, res, next) {
  delete(req.session.user);
  res.render('login', {  });
});


router.get('/', async function(req, res, next) {
  const user = {};
  res.render('index', { title: 'Express', data: await getMongoData(), user });
});


router.get('/search/:field/:searchWord', async function(req, res, next) {
  res.render('index', { title: 'Express', data: await getMongoDataBySearch(req.params.field, req.params.searchWord) });
});


router.get('/pharmacy', function(req, res, next) {
  res.render('pharm');
});

router.get('/table2/:select/:searchText', async function(req, res, next) {
  res.render('pharm', { data: await getMongoDataBySearch(req.params.select, req.params.searchText ) });
});

//admin page
router.get('/admin_page', function(req, res, next) {
  
  const enviroments = {};
  res.render('register-by-admin',{ enviroments, enviroments: dataMap });
});

router.get('/admin_table', async function(req, res, next) {
  const data = { };
 
  res.render('admin-table',{ data, data: await getAdminData(req.body) });
});


module.exports = router;
