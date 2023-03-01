const fs = require('fs');
const { stringify } = require('querystring');

let coWorkers = {
	"id": 3,
	"username": "ddd",
	"password": "1234",
	"department": ["Traumatology", "Narcology", "Angeologyt", "Cardiology"],
	"name": "name",
	"surname": "surname"
};




fs.writeFile('data.json', JSON.stringify(coWorkers), { flag: 'a' }, err => {
	if (err) throw err;
	console.log('Data appended to file');
  });