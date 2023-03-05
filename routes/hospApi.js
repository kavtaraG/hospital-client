var express = require('express');
var app = express.Router();
//const { getData, getDataById, createData, updateData, deleteData } = require('../controller/app.controller');
const { getMongoData, getMongoDataById, addMongoData, updateMongoData, getMongoDataBySearch } = require('../controller/app.mongo-hosps');

// var hosp = [
// 	{"id": 1, "name": "dude", "surname":"due", "age": 23, "mounth": 2, "year": 1990, "prescreption": "sdfdf", "drugs": "dsfsd"}
// ];


app.get('/', async (req, res) => {
	res.send(await getMongoData(req.body));
});

app.get('/:id', async (req, res) => {
	await getDataById(req.params.id);
});

app.post('/', async (req, res) => {
	let rec = req.body;
	await addMongoData(rec);
	res.send({status:'ok', msg: 'data edded'});
});

app.put('/', async (req, res) => {
	await updateMongoData(req.body);
	res,send({status: 'ok', msg: 'data updated'});
});

app.delete('/', async (req, res) => {
	await deleteData(req.body.id);
	res.send({status: 'ok', msg: 'data deleted'});
});

module.exports = app;