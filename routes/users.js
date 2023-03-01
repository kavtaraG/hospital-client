var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login', function(req, res, next) {
  console.log('username::'+ req.body.username);
  console.log('password::' + req.body.password);
  if(req.body.username == req.body.password && typeof(req.body.password) != 'undefined'){
    res.send({status: 'ok', msg: 'User login succesfull'});
  }else{
    res.send({status: 'fail', msg: 'Login failed'});
  };
});

module.exports = router;
