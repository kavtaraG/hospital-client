var express = require('express');
var app = express.Router();
const { getData, getDataById, createData, updateData, deleteData } = require('../controller/app.controller');

app.get('/', (req, res) => {
	res.send(getData());
});

app.get('/:id', (req, res) => {
	let rec = req.params.id;
	getDataById(rec);
	res.send(rec);
});

app.post('/', (req, res) => {
	let rec = req.body;
	createData(rec);
	res.send({status: 'ok', msg: 'Record added succesfully'});
});

app.put('/', (req, res) => {
	let rec = req.body;
	updateData(rec);
	res.send({status: 'ok', msg: 'Record updated'});
});

app.delete('/', (req, res) => {
	let rec = req.body;
	deleteData(rec);
	res.send({status: 'ok', msg: 'Record deleted'});
});

module.exports = app;