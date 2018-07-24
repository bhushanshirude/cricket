var express = require('express'),
    router = express.Router();
var CricketAPIServices = require('./services');
var Cricketcrditapi = require('./matchcredit');
var RecentMatchapi = require('./recent_match');
var users = require("../controller/controller.js");
var Oversummery = require('./over_summery_api');

// var CacherLogic = require('./cacherLogics');
var Matchlist = require('./match_list');
const match_list_schema = require('../model/match_list_schema');

router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Content-Type", "multipart/form-data");
    res.header("Content-Type", "text/plain");
    next();
});

//    ******************Do Not Delete*****************************************************//


// var cron = require('node-cron');
// cron.schedule('* * * * *', function () {
//     console.log('running a task every minute');
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     var dt = date.getDate();
//     var hour = date.getHours();
//     var min = date.getMinutes();
//     var sec = date.getSeconds();
//     if (dt < 10) {
//         dt = '0' + dt;
//     }
//     if (month < 10) {
//         month = '0' + month;
//     }
//     var start_date = year + '-' + month + '-' + 18 + ' ' + 0 + ':' + 0 + ':' + 0;
//     var start_date1 = year + '-' + month + '-' + 18 + ' ' + 23 + ':' + 59 + ':' + 59;
//     console.log('desired format: ' + start_date);
//     console.log('desired format: ' + start_date1);
//     match_list_schema.find({
//             "match_start_date": {
//                 '$gte': start_date,
//                 '$lt': start_date1
//             }
//         },
//         function (err, results) {
//             for (var i = 0; i < results.length; i++) {
//                 console.log(results[i].match_key);

//             }



//         }
//     );
//     // CricketAPIServices.scheduleResponse(shortDate).then((response) => {
//     //     res.render('schedule.html', response = response)
//     // }).catch(function (err) {
//     //     console.error('Oops we have an error', err);
//     // })
// });

// var cron = require('node-cron');
// var CronJob = require('cron').CronJob;
// var counter = 0;

// function createJobs(period, id) {
//     new CronJob(period, function () {
//         console.log(counter++, id)

//         // Oversummery.getMatchResponseold(id).then((response) => {
//         //     //   res.render('schedule.html', response = response)
//         // }).catch(function (err) {
//         //     console.error('Oops we have an error', err);
//         // })
//     }, null, true, 'Asia/Kolkata');
// }



// cron.schedule('* * * * * *', function () {
//     console.log('running a task every minute');
//     var date = new Date();
//     var year = date.getFullYear();
//     var month = date.getMonth() + 1;
//     var dt = date.getDate();
//     var hour = date.getHours();
//     var min = date.getMinutes();
//     var sec = date.getSeconds();
//     if (dt < 10) {
//         dt = '0' + dt;
//     }
//     if (month < 10) {
//         month = '0' + month;
//     }
//     var start_date = year + '-' + month + '-' + 18 + ' ' + 0 + ':' + 0 + ':' + 0;
//     var start_date1 = year + '-' + month + '-' + 18 + ' ' + 23 + ':' + 59 + ':' + 59;
//     console.log('desired format: ' + start_date);
//     console.log('desired format: ' + start_date1);

//     match_list_schema.find({
//             "match_start_date": {
//                 '$gte': start_date,
//                 '$lt': start_date1
//             }
//         },
//         function (err, results) {
//             console.log(results);
//             for (var i = 0; i < results.length; i++) {
//                 console.log(results[i].match_key);
//                 var match_key = results[i].match_key;
//                 createJobs('* * * * * *', 'job_id_' + match_key);


//             }



//         }
//     );



//     //     }
//     // );
//     // CricketAPIServices.scheduleResponse(shortDate).then((response) => {
//     //     res.render('schedule.html', response = response)
//     // }).catch(function (err) {
//     //     console.error('Oops we have an error', err);
//     // })
// });
//    ******************Do Not Delete*****************************************************//

router.get('/', function (req, res) {
    res.render('index.html')
});
router.post("/user", users.create);
router.get('/schedule/', function (req, res) {
    CricketAPIServices.scheduleResponse(null).then((response) => {
        //    console.log(responce);
        res.render('schedule.html', response = response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});

router.get('/schedule/:month/', function (req, res) {
    CricketAPIServices.scheduleResponse(req.params['month']).then((response) => {
        res.render('schedule.html', response = response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});

router.get('/get_match_list', function (req, res) {
    Matchlist.getmatch_list().then((response) => {
        res.json(response);
    }).catch(function (err) {})
});
router.post('/get_match_datewise', function (req, res) {
    var start_date = req.body.start_date;
    var end_date = req.body.end_date;
    Matchlist.getmatch_list_date(start_date, end_date).then((response) => {
        res.json(response);
    }).catch(function (err) {})
});


router.get('/recent_matches/', function (req, res) {
    RecentMatchapi.recentMatchesResponse().then((response) => {
        //  res.render('recent_matches.html', response=response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});

router.get('/match/:matchId/', function (req, res) {
    CricketAPIServices.getMatchResponse(req.params['matchId']).then((response) => {
        res.render('match_card.html', response = response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});

router.get('/match_credit/:matchId', function (req, res) {
    Cricketcrditapi.getteam_credit_Response(req.params['matchId']).then((response) => {
        //  console.log(response);
        res.json(response);
        //  res.render('match_card.html', response=response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});

router.get('/season/:season_key/:seson_team_key', function (req, res) {
    CricketAPIServices.getSeasonteamResponse(req.params['season_key'], req.params['seson_team_key']).then((response) => {
        //  res.render('match_card.html', response=response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});

//https: //rest.cricketapi.com/rest/v2/match/{MATCH_KEY}/overs_summary/

router.get('/matchapi/:match_key/', function (req, res) {
    Oversummery.getMatchResponseold(req.params['match_key']).then((response) => {
        //   res.render('schedule.html', response = response)
    }).catch(function (err) {
        console.error('Oops we have an error', err);
    })
});




module.exports = router;