	var express = require('express');
	var router = express.Router();
	var mongoose = require('mongoose');
	const user = require('../model/user_schema');
	var validator = require('validator');
	var randomstring = require("randomstring");
	var multer = require('multer');
	var fs = require('fs');

	var upload = multer({
		dest: 'uploads/'
	})

	router.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});


	router.post('/register', function (req, res, next) {
		var password = req.body.password;
		var email = req.body.email;
		var first = req.body.name.first;
		var last = req.body.name.last;
		var user_code = req.body.user_code;
		var user_pic = req.body.user_pic;

		var referral_code = randomstring.generate();
		var mobileNumber = req.body.mobileNumber;
		var referredBy = req.body.referredBy;
		var deviceType = req.body.deviceType;
		if (email != "" && password != "" && first != "" && last != "" && referral_code != "" && mobileNumber != "") {
			user.find({
				$or: [{
					'email': email
				}, {
					'mobileNumber': mobileNumber
				}],
				"password": password
			}, function (err, results) {
				if (results.length > 0) {
					res.status(200).json({
						status: "Success",
						message: "User already exists please login"
					});
				} else {
					const user_register = new user({
						password: password,
						email: email,
						isAdmin: 0,
						name: {
							first: first,
							last: last,
						},

						referralCode: referral_code,
						mobileNumber: mobileNumber,
						referredBy: referredBy,
						user_code: user_code,
						user_pic: user_pic,
						deviceType: deviceType

					});
					user_register.save().then(result => {
						res.status(200).json({
							status: "Success",
							message: "User Register Succesfully"
						});
					});


				}



			});
		} else {
			res.status(500).json({
				status: "error",
				message: "All Field Compulsory"
			});
		}

	});


	router.post('/login', function (req, res, next) {
		var email = req.body.email;
		var password = req.body.password;
		var mobileNumber = req.body.mobileNumber;
		if (mobileNumber == "") {
			if (email != "" && password != "") {
				user.find({
					"email": email,
					"password": password
				}, function (err, results) {
					if (results != "") {
						res.status(200).json({
							status: "Success",
							result: results
						});

					} else {
						res.status(200).json({
							status: "error",
							message: "please check your  credentials or register with us "
						});
					}
				});
			} else {
				res.status(200).json({
					status: "error",
					message: "Both fields required"
				});
			}
		}
		if (email == "") {
			if (mobileNumber != "" && password != "") {
				user.find({
					"mobileNumber": mobileNumber,
					"password": password
				}, function (err, results) {
					if (results != "") {
						res.status(200).json({
							status: "Success",
							result: results
						});

					} else {
						res.status(200).json({
							status: "error",
							message: "please check your  credentials or register with us "
						});
					}
				});
			} else {
				res.status(200).json({
					status: "error",
					message: "Both fields required"
				});

			}


		}


	});

	router.post('/profile', function (req, res, next) {

		var userid = req.body.userid;
		var password = req.body.password;
		var email = req.body.email;
		var first = req.body.name.first;
		var last = req.body.name.last;
		var referral_code = req.body.referral_code;
		var mobileNumber = req.body.mobileNumber;
		var referredBy = req.body.referredBy;
		var deviceType = req.body.deviceType;
		var gender = req.body.gender;
		var address = req.body.address;
		var city = req.body.city;
		var user_pic = req.body.user_pic;
		var user_code = req.body.user_code;


		user.update({
			"_id": userid
		}, {
			$set: {
				"name.first": first,
				"name.last": last,
				"email": email,
				"password": password,
				"mobileNumber": mobileNumber,
				"gender": gender,
				"address": address,
				"city": city,
				"referral_code": referral_code,
				"referredBy": referredBy,
				"deviceType": deviceType,
				"user_pic": user_pic,
				"user_code": user_code

			}
		}, function (err, results) {
			if (err) {
				res.status(500).json({
					status: "false",
					message: "user data not modified ",
					result: err
				});

			} else {
				user.find({
					"_id": userid
				}, function (err, results) {
					res.status(200).json({
						status: "success",
						message: "user data updated succesfully",
						result: results
					});
				});

			}



		});

	});
	router.post('/change_password', function (req, res, next) {
		var userid = req.body.userkey;


		var password = req.body.new_password;
		var confirm_password = req.body.confirm_password;
		if (password == confirm_password) {
			user.update({
				"_id": userid
			}, {
				$set: {

					"password": password,

				}
			}, function (err, results) {
				res.status(200).json({
					status: "Success",
					message: "your password is changed succesfully  ",

				});



			});

		} else {

			res.status(500).json({
				status: "false",
				message: "confirm password and new password not same  ",

			});

		}



	});


	router.post('/forgot_password', function (req, res, next) {

		var email = req.body.email;

		user.find({
			"email": email,

		}, function (err, results) {
			res.status(200).json({
				status: "Success",
				message: "Your Password is   ",
				result: results[0].password

			});


		});




	});



	module.exports = router;