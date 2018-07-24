	var express = require('express');
	var router = express.Router();
	var mongoose = require('mongoose');
	var userteam = require('../model/user_teams');
	var validator = require('validator');
	router.use(function (req, res, next) {
		res.header("Access-Control-Allow-Origin", "*");
		res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
		next();
	});
	router.post('/add', function (req, res, next) {

		var match_key = req.body.user.match_key;
		var userkey = req.body.user.user_key;
		var teamkey = req.body.user.team.team_key;
		var captain_key = req.body.user.team.captain_key;
		var vice_captain = req.body.user.team.vice_captain;

		var user_code = req.body.user.user_code;
		var user_pic = req.body.user.user_pic;
		var userteam1 = new userteam({
			user: {
				user_key: userkey,
				user_code: user_code,
				user_pic: user_pic,
				match_key: match_key,
				team: {
					team_id: teamkey,
					captain: captain_key,
					vice_captain: vice_captain,

					player1: {
						player_key: req.body.user.team.player1.player_key,
						player_role: req.body.user.team.player1.player_role,
						player_name: req.body.user.team.player1.player_name,
						player_credit_point: req.body.user.team.player1.player_credit_point,
						captain: req.body.user.team.player1.captain,
						vice_captain: req.body.user.team.player1.vice_captain
					},
					player2: {
						player_key: req.body.user.team.player2.player_key,
						player_role: req.body.user.team.player2.player_role,
						player_name: req.body.user.team.player2.player_name,
						player_credit_point: req.body.user.team.player2.player_credit_point,
						captain: req.body.user.team.player2.captain,
						vice_captain: req.body.user.team.player2.vice_captain
					},
					player3: {
						player_key: req.body.user.team.player3.player_key,
						player_role: req.body.user.team.player3.player_role,
						player_name: req.body.user.team.player3.player_name,
						player_credit_point: req.body.user.team.player3.player_credit_point,
						captain: req.body.user.team.player3.captain,
						vice_captain: req.body.user.team.player3.vice_captain
					},
					player4: {
						player_key: req.body.user.team.player4.player_key,
						player_role: req.body.user.team.player4.player_role,
						player_name: req.body.user.team.player4.player_name,
						player_credit_point: req.body.user.team.player4.player_credit_point,
						captain: req.body.user.team.player4.captain,
						vice_captain: req.body.user.team.player4.vice_captain
					},
					player5: {
						player_key: req.body.user.team.player5.player_key,
						player_role: req.body.user.team.player5.player_role,
						player_name: req.body.user.team.player5.player_name,
						player_credit_point: req.body.user.team.player5.player_credit_point,
						captain: req.body.user.team.player5.captain,
						vice_captain: req.body.user.team.player5.vice_captain
					},
					player6: {
						player_key: req.body.user.team.player6.player_key,
						player_role: req.body.user.team.player6.player_role,
						player_name: req.body.user.team.player6.player_name,
						player_credit_point: req.body.user.team.player6.player_credit_point,
						captain: req.body.user.team.player6.captain,
						vice_captain: req.body.user.team.player6.vice_captain
					},
					player7: {
						player_key: req.body.user.team.player7.player_key,
						player_role: req.body.user.team.player7.player_role,
						player_name: req.body.user.team.player7.player_name,
						player_credit_point: req.body.user.team.player7.player_credit_point,
						captain: req.body.user.team.player7.captain,
						vice_captain: req.body.user.team.player7.vice_captain
					},
					player8: {
						player_key: req.body.user.team.player8.player_key,
						player_role: req.body.user.team.player8.player_role,
						player_name: req.body.user.team.player8.player_name,
						player_credit_point: req.body.user.team.player8.player_credit_point,
						captain: req.body.user.team.player8.captain,
						vice_captain: req.body.user.team.player8.vice_captain
					},
					player9: {
						player_key: req.body.user.team.player9.player_key,
						player_role: req.body.user.team.player9.player_role,
						player_name: req.body.user.team.player9.player_name,
						player_credit_point: req.body.user.team.player9.player_credit_point,
						captain: req.body.user.team.player9.captain,
						vice_captain: req.body.user.team.player9.vice_captain
					},
					player10: {
						player_key: req.body.user.team.player10.player_key,
						player_role: req.body.user.team.player10.player_role,
						player_name: req.body.user.team.player10.player_name,
						player_credit_point: req.body.user.team.player10.player_credit_point,
						captain: req.body.user.team.player10.captain,
						vice_captain: req.body.user.team.player10.vice_captain
					},
					player11: {
						player_key: req.body.user.team.player11.player_key,
						player_role: req.body.user.team.player11.player_role,
						player_name: req.body.user.team.player11.player_name,
						player_credit_point: req.body.user.team.player11.player_credit_point,
						captain: req.body.user.team.player11.captain,
						vice_captain: req.body.user.team.player11.vice_captain
					},

				}

			}


		});



		userteam.find({
				"user.team.team_id": teamkey,
				"user.user_key": userkey,
				"user.match_key": match_key,

			},
			function (err, results) {
				if (results == "") {
					userteam1.save().then(results => {
						if (results != "") {
							res.status(200).json({
								status: "Success",
								msg: "User Team Created Succesfully"
							});
						}

					});

				} else {

					res.status(500).json({
						status: "error",
						msg: "Your team  already created please create new team "
					});
				}



			});
	});


	router.post('/team_list', function (req, res, next) {
		userkey = req.body.user_key;
		match_key = req.body.match_key;
		userteam.find({
				"user.user_key": userkey,
				"user.match_key": match_key,

			},
			function (err, results) {

				if (results == "") {
					res.status(500).json({
						status: "error",
						msg: "No team is present for this match please create team"
					});



				} else {
					res.status(200).json({
						status: "success",
						msg: "your team data",
						data: results

					});

				}

			});



	});



	module.exports = router;