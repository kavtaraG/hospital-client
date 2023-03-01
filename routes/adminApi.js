var express = require('express');
var app = express.Router();

//const { getArminData, getAdminDataById, createAdminData, updateAdminData, deleteAdminData } = require('../controller/app.admin-data');
const { getAdminData, getAdminDataById, addAdminData } = require('../controller/app.admin');

let adminData = [
	{
		id: "1", 
		username: "admin", 
		password: "admin",
		full_name: "admin",
		department: ["Traumatology", "Angeology", "IT"]
	}
];

app.get('/', async(req, res) => {
	// res.send(getArminData(req.body));
	res.send(await getAdminData());
});

app.get('/:id', async (req, res) => {
	await getAdminDataById(req.params.id);
	// let data = adminData.filter((item) => (item.id == req.params.id));
	// if(data.length > 0){
	// 	res.send(data[0]);
	// }else{
	// 	res.send([]);
	// };
});

app.post('/', async (req, res) => {
	let rec = req.body;
	await addAdminData(rec);
	// createAdminData(rec);
	// rec.id = Date.now();
	// adminData.push(rec);
	res.send({status: 'ok', msg: 'Record added'});
});

app.put('/', (req, res) => {
	//updateAdminData(req.body);
	// const data = req.body;
	// adminData.map((item, index) => {
	// 	if(data.id == item.id){
	// 		return adminData[index] == data;
	// 	};
	// });
	res.send({status: 'ok', msg: 'Data updated'});
});

app.delete('/', (req, res) => {
	//deleteAdminData(req.body.id);
	// let data = adminData.filter((item) => (item.id != req.body.id));
	// adminData == data;
	res.send({status: 'ok', msg: 'Data deleleted'});
});

module.exports = app;