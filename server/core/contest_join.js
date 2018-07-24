var express = require('express');
var router = express.Router();
//var randomstring = require("randomstring");
var mongoose = require('mongoose');

const contest_join = require('../model/contest_join_schema');

const contest_schema = require('../model/contest_create_schema');
const match_data = require('../model/match_list_schema');
const over_summery = require('../model/over_summery_api_schema');
const user_schema = require('../model/user_schema');



// router.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "*");
//   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//   res.header("Content-Type", "application/x-www-form-urlencoded");
//   res.header("Content-Type", "multipart/form-data");
//   res.header("Content-Type", "text/plain");
//   next();
// });


router.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Content-Type", "application/x-www-form-urlencoded");
  res.header("Content-Type", "multipart/form-data");
  res.header("Content-Type", "application/json");
  // return res;
  next();


});
router.post('/add', function (req, res, next) {
  // var  referral_code = randomstring.generate();
  var match_id = req.body.match_id;
  var contest_id = req.body.contest_id;
  var referral_code = req.body.referral_code;
  var team_key = req.body.user.team.team_key;
  var match_key = req.body.match_key;




  var captain_key = req.body.user.team.captain_key;
  var vice_captain = req.body.user.team.vice_captain;
  var contest_create = new contest_join({
    match_id: match_id,
    contest_key: contest_id,
    contest_referral_code: referral_code,
    match_key: match_key,
    user: {
      user_key: req.body.user.user_key,
      user_code: req.body.user.user_code,
      user_pic: req.body.user.user_pic,


      team: {
        team_key: team_key,
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

  contest_join.find({
      "match_id": match_id,
      "contest_key": contest_id,
      "user.user_key": req.body.user.user_key,
    },
    function (err, results) {
      if (results != "") {
        res.status(500).json({
          status: "false",
          msg: "Your Team Already present "
        });


      } else {
        contest_create.save().then(results => {



          contest_join.find({
            "match_id": match_id,
            "contest_key": contest_id,
          }, function (err, contest) {
            if (contest != "") {
              var contest_length = contest.length;
              console.log(contest_length);

              contest_schema.update({
                "_id": contest_id,
                "match_id": match_id
              }, {
                $set: {

                  "contest_join_cnt": contest_length,

                }
              }, function (err, results) {


              });



              contest_join.find({
                "match_id": match_id,
                "contest_key": contest_id,
                "user.user_key": req.body.user.user_key,
              }, function (err, results) {
                res.status(200).json({
                  status: "Success",
                  msg: "contest join Succesfully ",
                  data: results
                });

              });


            }




          });
        });

      }


    }


  );


});

router.post('/switch_team', function (req, res, next) {
  var match_id = req.body.match_id;
  var contest_id = req.body.contest_id;
  var user_id = req.body.user.user_key;
  var referral_code = req.body.referral_code;
  var user_code = req.body.user.user_code;
  var user_pic = req.body.user.user_pic;
  var match_key = req.body.match_key;
  contest_join.update({
      "match_id": match_id,
      "contest_key": contest_id,
      "contest_referral_code": referral_code,
      "user.user_key": user_id,
    }, {
      $set: {
        "match_id": match_id,
        "match_key": match_key,
        "contest_key": contest_id,
        "user": {
          "user_key": user_id,
          "user_code": user_code,
          "user_pic": user_pic,
          "team": {
            "team_key": req.body.user.team.team_key,
            "captain": req.body.user.team.captain_key,
            "vice_captain": req.body.user.team.vice_captain,
            "player1": {
              "player_key": req.body.user.team.player1.player_key,
              "player_role": req.body.user.team.player1.player_role,
              "player_name": req.body.user.team.player1.player_name,
              "player_credit_point": req.body.user.team.player1.player_credit_point,
              "captain": req.body.user.team.player1.captain,
              "vice_captain": req.body.user.team.player1.vice_captain
            },
            "player2": {
              "player_key": req.body.user.team.player2.player_key,
              "player_role": req.body.user.team.player2.player_role,
              "player_name": req.body.user.team.player2.player_name,
              "player_credit_point": req.body.user.team.player2.player_credit_point,
              "captain": req.body.user.team.player2.captain,
              "vice_captain": req.body.user.team.player2.vice_captain
            },
            "player3": {
              "player_key": req.body.user.team.player3.player_key,
              "player_role": req.body.user.team.player3.player_role,
              "player_name": req.body.user.team.player3.player_name,
              "player_credit_point": req.body.user.team.player3.player_credit_point,
              "captain": req.body.user.team.player3.captain,
              "vice_captain": req.body.user.team.player3.vice_captain
            },
            "player4": {
              "player_key": req.body.user.team.player4.player_key,
              "player_role": req.body.user.team.player4.player_role,
              "player_name": req.body.user.team.player4.player_name,
              "player_credit_point": req.body.user.team.player4.player_credit_point,
              "captain": req.body.user.team.player4.captain,
              "vice_captain": req.body.user.team.player4.vice_captain
            },
            "player5": {
              "player_key": req.body.user.team.player5.player_key,
              "player_role": req.body.user.team.player5.player_role,
              "player_name": req.body.user.team.player5.player_name,
              "player_credit_point": req.body.user.team.player5.player_credit_point,
              "captain": req.body.user.team.player5.captain,
              "vice_captain": req.body.user.team.player5.vice_captain
            },
            "player6": {
              "player_key": req.body.user.team.player6.player_key,
              "player_role": req.body.user.team.player6.player_role,
              "player_name": req.body.user.team.player6.player_name,
              "player_credit_point": req.body.user.team.player6.player_credit_point,
              "captain": req.body.user.team.player6.captain,
              "vice_captain": req.body.user.team.player6.vice_captain
            },
            "player7": {
              "player_key": req.body.user.team.player7.player_key,
              "player_role": req.body.user.team.player7.player_role,
              "player_name": req.body.user.team.player7.player_name,
              "player_credit_point": req.body.user.team.player7.player_credit_point,
              "captain": req.body.user.team.player7.captain,
              "vice_captain": req.body.user.team.player7.vice_captain
            },
            "player8": {
              "player_key": req.body.user.team.player8.player_key,
              "player_role": req.body.user.team.player8.player_role,
              "player_name": req.body.user.team.player8.player_name,
              "player_credit_point": req.body.user.team.player8.player_credit_point,
              "captain": req.body.user.team.player8.captain,
              "vice_captain": req.body.user.team.player8.vice_captain
            },
            "player9": {
              "player_key": req.body.user.team.player9.player_key,
              "player_role": req.body.user.team.player9.player_role,
              "player_name": req.body.user.team.player9.player_name,
              "player_credit_point": req.body.user.team.player9.player_credit_point,
              "captain": req.body.user.team.player9.captain,
              "vice_captain": req.body.user.team.player9.vice_captain
            },
            "player10": {
              "player_key": req.body.user.team.player10.player_key,
              "player_role": req.body.user.team.player10.player_role,
              "player_name": req.body.user.team.player10.player_name,
              "player_credit_point": req.body.user.team.player10.player_credit_point,
              "captain": req.body.user.team.player10.captain,
              "vice_captain": req.body.user.team.player10.vice_captain
            },
            "player11": {
              "player_key": req.body.user.team.player11.player_key,
              "player_role": req.body.user.team.player11.player_role,
              "player_name": req.body.user.team.player11.player_name,
              "player_credit_point": req.body.user.team.player11.player_credit_point,
              "captain": req.body.user.team.player11.captain,
              "vice_captain": req.body.user.team.player11.vice_captain
            }
          }

        }
      }
    },
    function (err, results) {
      if (err) {
        res.status(500).json({
          status: "false",
          message: "Your Team is not changed  ",
          result: err
        });

      } else {
        res.status(200).json({
          status: "success",
          message: "Your Team is changed succesfully ",

        });
      }
    }
  );
});

router.post('/get_contest_join_user', function (req, res, next) {
  match_id = req.body.match_id;
  contest_id = req.body.contest_id;
  referral_code = req.body.referral_code;

  contest_join.find({
      "match_id": match_id,
      "contest_key": contest_id,
      "contest_referral_code": referral_code,

    },
    function (err, results) {
      if (results != "") {
        var count = results.length;
        res.status(200).json({

          status: "Success",
          results: results,
          user_join_cnt: count
        });
      }


    }

  );



});

router.post('/contest_data', function (req, res, next) {
  referralCode = req.body.referralCode;

  contest_schema.find({
      "contest.referralCode": referralCode,

    },
    function (err, results) {
      if (err) {
        console.log(err);
      }
      if (results != "") {

        res.status(200).json({

          status: "Success",
          results: results,

        });
      }


    }

  );

});

router.post('/get_contest_join_data', function (req, res, next) {
  user_key = req.body.user_key;

  contest_join.find({
      "user.user_key": user_key,

    },
    function (err, results) {


      match_data.find({


        },
        function (err, results1) {

          res.status(200).json({
            status: "success",
            msg: "your contest join data",
            data: results,
            match_data: results1

          });

        });



    }


  );

});


router.post('/get_rank_list', function (req, res, next) {
  match_key = req.body.match_key;
  contest_id = req.body.contest_id;

  contest_join.find({
      "match_key": match_key,
      "contest_key": contest_id

    },
    function (err, resultsone) {


      over_summery.find({

          "match_key": match_key,
        },
        function (err, resultstwo) {

          full_score = 0;
          score = 0;
          for (var i = 0; i < resultstwo.length; i++) {

            for (var j = 0; j < resultsone.length; j++) {

              for (var x = 1; x < 12; x++) {

                if (resultstwo[i].player_key == resultsone[j].user.team['player' + x].player_key) {
                  value = resultstwo[i].player_key;
                  valuedata = resultstwo[i].player_score;

                  let vindex = 'player' + x;
                  if (resultsone[j].user.team['player' + x].captain == "1") {
                    score = valuedata * 2;
                  } else if (resultsone[j].user.team['player' + x].vice_captain == "1") {
                    score = valuedata * 1.5;
                  } else {
                    score = valuedata;
                  }
                  full_score = full_score + score;
                  contest_join.update({

                      ['user.team.' + vindex + '.player_key']: value,



                    }, {
                      $set: {
                        ['user.team.' + vindex + '.player_score']: parseInt(score),
                        'user.user_score': full_score
                        //   "user.team.player1.captain": parseInt(12),



                      }
                    },
                    function (err, results) {

                      //   var a = count(results);
                      //  console.log(count(results.ok));
                      //    console.log(results.ok.length);
                      //res.send(true);



                      console.log(results);



                    })
                }


              }


            }

          }




        });



    }


  );

});

router.post('/get_rank_list_data', function (req, res) {
  match_key = req.body.match_key;
  contest_id = req.body.contest_id;


  contest_join.find({
      "match_key": match_key,
      "contest_key": contest_id

    },
    function (err, totaresult) {




      res.status(200).json({

        data: totaresult,
        status: "Success",
        message: "total rank list"
      });



    });



});


module.exports = router;