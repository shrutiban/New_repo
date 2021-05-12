'use strict';

const mongoose = require('mongoose');
let auth = require('../middleware/auth');

const individualSchema = mongoose.Schema({
	name: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true,
		unique: true
	},
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	}
	// classPref: {
	// 	type: String,
	// 	default: "any"
	// },
	// subjectPref: {
	// 	type: String,
	// 	default: "any"
	// },
	// daysPref: {
	// 	type: String,
	// 	default: "any"
	// }
}, {
	timestamps: true
});

individualSchema.pre('save', function(next) {
	let derivedKey = auth.generatePassword(this.password);
	this.password = derivedKey;
	next();
});

module.exports = mongoose.model('individual', individualSchema, 'individual');