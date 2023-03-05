var express = require('express');
var router = express.Router();
const { addAdminData, authUsersData } = require('../controller/app.admin');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', async function(req, res, next) {
  let result = await authUsersData('mail', req.body.mail, req.body.password);
  console.log('+++++result: ', result);
  console.log('+++++++++id: ', result[0]['_id']);
  console.log('*******mail: ', result[0]['mail']);
  console.log('***password: ', result[0]['password']);
  console.log('+++++++role: ', result[0]['role']);
  res.cookie('userId', result[0]['_id']);
  let role = result[0]['role'];

  if(result){
    req.session.user = req.body.username;
    req.session.role = role;

    res.send({status:'ok', msg: 'login success'});
  }else{
    res.send({status:'fail', msg: 'login dinied'});
  };
});

router.post('/admin_page', async function(req, res, next) {
  let resilt = await addAdminData(req.body);
  req.session.user = resilt;
  req.session.role = 'user';
  res.send({status: 'ok', msg: 'data added'});
});

module.exports = router;
