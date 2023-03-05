const mongoose = require('mongoose');

const HospsSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true	
	},
	role: {
		type: String,
		default: 'user' || 'admin'
	},
	surname: {
		type: String,
		required: true,
	},
	age: {
		type: Number,
		require: true,
		max: 3
	},
	mounth: {
		type: Number,
		required: true,
		max:2
	},
	year: {
		type: Number,
		required: true,
		max:4
	},
	ID: {
		type: Number,
		required: true,
		max: 11,
		min: 11
	},
	prescreption: {
		type: String,
		required: true,
		max: 200
	},
	drugs: {
		type: String,
		required: true
	},
},
{timestamps:true}
);

module.exports = mongoose.model('User', HospsSchema);