var hosp = [
	{
		"id": 1,
		"username": "doc",
		"password": "1234",
		"department": ["Traumatology", "Narcology", "Angeologyt", "Cardiology"],
		"name": "name",
		"surname": "surname"
	}
];

const fs = require('fs');

const data = JSON.parse(fs.readFileSync(`${__dirname}/./data.json`));

console.log(data[0].username);

const getData = () => (data);


const getDataById = (id) => {
	let rec = hosp.filter((item) => (item.id == id));
	if(rec.length > 0) {
		return rec[0];
	}else{
		return rec [{}];
	};
};

const createData = (record) => {
	record.id = Date.now();
	data.push(record);
};

const updateData = (record) => {
	hosp.map((item, index) => {
		if(record.id == item.id){
			data[index] = record;
		};
	});
};

const deleteData = (id) => {
	let temp = data.filter((item) => (item.id != id));
	data = temp;
};

module.exports = { getData, getDataById, createData, updateData, deleteData, data };