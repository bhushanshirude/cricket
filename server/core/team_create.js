var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
const User_team = require('../model/team_create_schema');
router.post('/add', function (req, res, next) {
  var userid = req.body.user_id;
  var player_role = req.body.player_role;
  var match_id = req.body.match_id;
  var player_key = req.body.player_key;
  User_team.find({
      'match_id': match_id,
      'user_id': userid,
      'player_key': player_key
    },

    function (err, results) {

      var count = results.length;
      if (count > 0) {
        res.status(200).json({
          status: "Success",
          message: "player already exists in your team "
        });

      } else {
        User_team.find({
            'match_id': match_id,
            'user_id': userid
          },
          function (err, results) {
            var count = results.length;
            total = 0; //set a variable that holds our total
            var i;
            for (i = 0; i < count; i++) { //loop through the array
              total += results[i].player_credit_point; //Do the math!
            }
            if (total > 99) {
              //  console.log("your point is grather than 100")
              res.status(200).json({
                status: "Success",
                message: "your point is grather than 100"
              });

            } else {
              console.log(count);
              if (count > 10) {

                // var responce="your team is created   Succesfully";
                // res.json(responce);
                res.status(200).json({
                  status: "Success",
                  message: "your team is created   Succesfully"
                });
              } else {

                if (player_role == "keeper") {
                  User_team.find({
                    'player_role': player_role,
                    'match_id': match_id,
                    'user_id': userid
                  }, function (err, results) {
                    var count = results.length
                    if (count > 0) {

                      res.status(200).json({
                        status: "Success",
                        message: "keeper is already exist"
                      });
                    } else {
                      const user_team = new User_team({
                        "team_id": req.body.team_id,
                        "player_key": req.body.player_key,
                        "match_id": req.body.match_id,
                        "user_id": req.body.user_id,
                        "player_role": req.body.player_role,
                        "player_name": req.body.player_name,
                        "player_credit_point": req.body.player_credit_point,
                        "team_name": req.body.team_name,
                        "team_key": req.body.team_key


                      });
                      user_team.save().then(result => {
                        res.status(200).json({
                          status: "Success",
                          message: "keeper save Succesfully"
                        });
                      });
                    }

                  });
                }
                if (player_role == "batsman") {
                  User_team.find({
                      'player_role': player_role,
                      'match_id': match_id,
                      'user_id': userid
                    },
                    function (err, results) {
                      var count = results.length
                      if (count > 4) {

                        res.status(200).json({
                          status: "Success",
                          message: "you can only  add 3 to 5 bastman"
                        });


                      } else {
                        const user_team = new User_team({
                          "team_id": req.body.team_id,
                          "player_key": req.body.player_key,
                          "match_id": req.body.match_id,
                          "user_id": req.body.user_id,
                          "player_role": req.body.player_role,
                          "player_name": req.body.player_name,
                          "player_credit_point": req.body.player_credit_point,
                          "team_name": req.body.team_name,
                          "team_key": req.body.team_key

                        });
                        user_team.save().then(result => {
                          res.status(200).json({
                            status: "Success",
                            message: "batsman save Succesfully"
                          });
                        });
                      }

                    });

                }
                if (player_role == "allrounder") {
                  User_team.find({
                    'player_role': player_role,
                    'match_id': match_id,
                    'user_id': userid
                  }, function (err, results) {
                    var count = results.length
                    if (count > 2) {
                      // var msg="you can only  add 1 to  3 allrounder";

                      // res.json(msg);
                      res.status(200).json({
                        status: "Success",
                        message: "you can only  add 1 to  3 allrounder"
                      });

                    } else {
                      const user_team = new User_team({
                        "player_key": req.body.player_key,
                        "match_id": req.body.match_id,
                        "user_id": req.body.user_id,
                        "player_role": req.body.player_role,
                        "player_name": req.body.player_name,
                        "player_credit_point": req.body.player_credit_point,
                        "team_id": req.body.team_id,
                        "team_name": req.body.team_name,
                        "team_key": req.body.team_key


                      });
                      user_team.save().then(result => {
                        res.status(200).json({
                          status: "Success",
                          message: "allrounder save Succesfully"
                        });

                      });

                    }

                  });
                }
                if (player_role == "bowler") {
                  User_team.find({
                      'player_role': player_role,
                      'match_id': match_id,
                      'user_id': userid
                    },
                    function (err, results) {
                      var count = results.length
                      if (count > 4) {
                        // var msg="you can only  add 3 to 5 bowler";

                        // res.json(msg);
                        res.status(200).json({
                          status: "Success",
                          message: "you can only  add 3 to 5 bowler"
                        });

                      } else {
                        const user_team = new User_team({
                          "player_key": req.body.player_key,
                          "match_id": req.body.match_id,
                          "user_id": req.body.user_id,
                          "player_role": req.body.player_role,
                          "player_name": req.body.player_name,
                          "player_credit_point": req.body.player_credit_point,
                          "team_id": req.body.team_id,
                          "team_name": req.body.team_name,
                          "team_key": req.body.team_key


                        });
                        user_team.save().then(result => {
                          //  var responce="bowler save Succesfully";
                          //                res.json(responce);
                          res.status(200).json({
                            status: "Success",
                            message: "bowler save Succesfully"
                          });

                        });

                      }

                    });
                }
              }
            }
          });
      }
    });
});



router.get('/delete/:id', function (req, res, next) {
  //console.log(req.params.id);
  var id = req.params.id;
  User_team.deleteOne({
      "_id": id
    },
    function (err, results) {

      res.status(200).json({
        status: "Success",
        message: "player delete succesfully"
      });
    });
});

router.post('/delete_team', function (req, res, next) {
  var userid = req.body.user_id;
  var match_id = req.body.match_id;
  User_team.deleteMany({
      "match_id": match_id,
      "user_id": userid
    },
    function (err, results) {
      res.status(200).json({
        status: "Success",
        message: "all player delete succesfully"
      });
    });

});

router.get('/get/:id', function (req, res, next) {
  User_team.findById(
    req.params.id,

    function (err, post) {
      if (err) return next(err);
      res.json(post);
    });
});


router.post('/get_player_list', function (req, res, next) {
  var userid = req.body.user_id;
  var match_id = req.body.match_id;
  User_team.find({
      'match_id': match_id,
      'user_id': userid
    },
    function (err, results) {
      res.status(200).json({
        status: "Success",
        message: "your team data",
        data: results
      });

    });

});


router.post('/set_wise_captain', function (req, res, next) {
  var id = req.body.id;
  var userid = req.body.user_id;
  var match_id = req.body.match_id;
  var player_key = req.body.player_key;
  User_team.find({
      'match_id': match_id,
      'user_id': userid,
      'player_key': player_key,
    },
    function (err, results) {
      var captain_avliable = results[0].captain;
      //   console.log(captain_avliable);
      //0==captain not present ,1==captain presnt 
      if (captain_avliable == 1) {
        User_team.update({
          'match_id': match_id,
          'user_id': userid,
          'player_key': player_key,
        }, {
          $set: {
            "vice_captain": 1,
            "captain": 0
          }
        }, function (err, results) {
          if (results != "") {

            User_team.updateMany({
              'match_id': match_id,
              'user_id': userid,
              "player_key": {
                $ne: player_key
              },


            }, {
              $set: {
                "vice_captain": 0,

              }
            }, function (err, results) {
              User_team.find({
                  'match_id': match_id,
                  'user_id': userid
                },
                function (err, results) {
                  res.status(200).json({
                    data: results,
                    status: "Success",
                    message: "Wise Captain update Succesfully"
                  });
                });


            });
          }

        });

      } else {
        User_team.update({
          'match_id': match_id,
          'user_id': userid,
          'player_key': player_key,

        }, {
          $set: {
            "vice_captain": 1,
            "captain": 0
          }
        }, function (err, results) {
          if (results != "") {
            // res.status(200).json("bye");
            //     db.userteams.updateMany( { "player_key": { $ne: "w_da_hazell" } }, { $set: { vice_captain: 20 } } )

            User_team.updateMany({
              'match_id': match_id,
              'user_id': userid,
              "player_key": {
                $ne: player_key
              },


            }, {
              $set: {
                "vice_captain": 0,

              }
            }, function (err, results) {
              User_team.find({
                  'match_id': match_id,
                  'user_id': userid
                },
                function (err, results) {
                  res.status(200).json({
                    data: results,
                    status: "Success",
                    message: "Wise Captain update Succesfully"
                  });

                });
            });
          }


        });
      }

    });



});



router.post('/set_captain', function (req, res, next) {
  var id = req.body.id;
  var userid = req.body.user_id;
  var match_id = req.body.match_id;
  var player_key = req.body.player_key;
  User_team.find({
      'match_id': match_id,
      'user_id': userid,
      'player_key': player_key,
    },
    function (err, results) {
      var vice_captain_avliable = results[0].vice_captain;

      // console.log(vice_captain_avliable);
      //0==captain not present ,1==captain presnt 
      if (vice_captain_avliable == 1) {
        User_team.update({
          'match_id': match_id,
          'user_id': userid,
          'player_key': player_key,
        }, {
          $set: {
            "vice_captain": 0,
            "captain": 1
          }
        }, function (err, results) {
          if (results != "") {

            User_team.updateMany({
              'match_id': match_id,
              'user_id': userid,
              "player_key": {
                $ne: player_key
              },


            }, {
              $set: {
                "captain": 0,

              }
            }, function (err, results) {
              User_team.find({
                  'match_id': match_id,
                  'user_id': userid
                },
                function (err, results) {
                  res.status(200).json({
                    data: results,
                    status: "Success",
                    message: " Captain update Succesfully"
                  });
                });

            });
          }

        });

      } else {
        User_team.update({
          'match_id': match_id,
          'user_id': userid,
          'player_key': player_key,

        }, {
          $set: {
            "vice_captain": 0,
            "captain": 1
          }
        }, function (err, results) {
          if (results != "") {
            // res.status(200).json("bye");
            //     db.userteams.updateMany( { "player_key": { $ne: "w_da_hazell" } }, { $set: { vice_captain: 20 } } )

            User_team.updateMany({
              'match_id': match_id,
              'user_id': userid,
              "player_key": {
                $ne: player_key
              },


            }, {
              $set: {
                "captain": 0,

              }
            }, function (err, results) {
              User_team.find({
                  'match_id': match_id,
                  'user_id': userid
                },
                function (err, results) {
                  res.status(200).json({
                    data: results,
                    status: "Success",
                    message: " Captain update Succesfully"
                  });
                });

            });
          }


        });
      }



      //console.log(results.captain);
    });



});





router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});




module.exports = router;