	const mongoose = require("mongoose");
	const userSchema = mongoose.Schema({
		password: {
			type: String,
			default: null
		},
		email: {
			type: String,
			default: null
		},
		isAdmin: {
			type: Boolean,
			default: null
		},
		name: {
			first: {
				type: String,
				default: null
			},
			last: {
				type: String,
				default: null
			}
		},

		gender: {
			type: String,
			default: null
		},
		address: {
			type: String,
			default: null
		},
		city: {
			type: String,
			default: null
		},
		referralCode: {
			type: String,
			default: null
		},
		mobileNumber: {
			type: String,
			default: null
		},
		referredBy: {
			type: String,
			default: null
		},
		deviceType: {
			type: String,
			default: null
		},
		user_code: {
			type: String,
			default: null
		},
		user_pic: {
			type: String,
			default: 1
		}




	});
	module.exports = mongoose.model("users", userSchema);