let http = require('http');
let https = require('https');
let request = require('request');

let Config = require('../config');
let Token = require('./auth')
const querystring = require('querystring');
var mongoose = require('mongoose');
var empty = require('is-empty');
var CacherLogic;
const express = require('express')
const app = express()
const overs_summary = require('../model/over_summery_api_schema');

let host = Config.backend.host
let lastQuery = {}

let memCacheEnable = Config.enable_memcache

if (memCacheEnable) {
    CacherLogic = require('./cacherLogics');
}

class Oversummery {
    constructor() {
        this.formateUrl = '',
            this.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
    }

    getAccessToken() {
        return new Promise(resolve => {
            var options = {
                url: host + '/rest/v2/auth/',
                method: 'POST',
                json: true,
                gzip: true,
                form: Config.auth
            }

            request(options, function (error, response, body) {

                if (error) console.log(error);
                else {
                    if (body.status_code == 200) {
                        resolve({
                            token: body.auth.access_token
                        })
                        console.log('body.auth.access_token', body.auth.access_token);
                    } else {
                        resolve(false);
                    }
                };
            });
        });
    }

    setAccessToken() {
        return new Promise(resolve => {
            this.getAccessToken().then((data) => {
                if (data) {
                    let gotToken = data;
                    Token.key = gotToken.token;
                    resolve(true);
                }
            })
        });
    }

    getAccessTokennew() {
        return new Promise(resolve => {
            var options = {
                url: host + '/rest/v3/auth/',
                method: 'POST',
                json: true,
                gzip: true,
                form: Config.auth
            }


            request(options, function (error, response, body) {
                console.log(body);
                if (error) console.log(error);
                else {
                    if (body.status_code == 200) {
                        resolve({
                            token: body.auth.access_token
                        })
                        console.log('body.auth.access_token', body.auth.access_token);
                    } else {
                        resolve(false);
                    }
                };
            });
        });
    }

    setAccessTokennew() {
        return new Promise(resolve => {
            this.getAccessTokennew().then((data) => {
                if (data) {
                    let gotToken = data;
                    Token.key = gotToken.token;
                    resolve(true);
                }
            })
        });
    }
    recentMatchesResponse() {
        let apiPath = '/rest/v2/recent_matches/';
        let params = {};
        return new Promise((resolve, reject) => {
            resolve(this.getData(apiPath, params));
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }

    scheduleResponse(month) {
        let apiPath = '/rest/v2/schedule/';
        let params = {};
        if (month) {
            params['date'] = month
        }
        return new Promise((resolve, reject) => {
            resolve(this.getData(apiPath, params));
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }

    getMatchResponsenew(matchId) {
        let apiPath = '/rest/v2/match/' + matchId + '/balls/';
        let params = {
            matchId
        }
        //  let cacheKey = 'match|' + matchId + '|full_card';
        return new Promise((resolve, reject) => {
            if (memCacheEnable) {
                CacherLogic.getCachedData(cacheKey).then((cachedResponse) => {
                    if (cachedResponse && cachedResponse != null) {
                        resolve(cachedResponse)
                    } else {
                        resolve(this.getData(apiPath, params));
                    }
                });
            } else {
                resolve(this.getData(apiPath, params));
            }
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }

    getMatchResponseold(matchId) {
        var card_type = "full_card";
        let apiPath = '/rest/v2/match/' + matchId + '/';
        let params = {
            matchId,
            card_type
        }
        let cacheKey = 'match|' + matchId + '|full_card';
        return new Promise((resolve, reject) => {
            if (memCacheEnable) {
                CacherLogic.getCachedData(cacheKey).then((cachedResponse) => {
                    if (cachedResponse && cachedResponse != null) {
                        resolve(cachedResponse)
                    } else {
                        resolve(this.getData(apiPath, params));
                    }
                });
            } else {
                resolve(this.getData(apiPath, params));
            }
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }

    matchlistdata(matchId) {
        let apiPath = '/rest/v2/match/' + matchId + '/overs_summary';
        let params = {
            matchId
        }
        let cacheKey = 'match|' + matchId + '|overs_summary';
        return new Promise((resolve, reject) => {
            if (memCacheEnable) {
                CacherLogic.getCachedData(cacheKey).then((cachedResponse) => {
                    if (cachedResponse && cachedResponse != null) {
                        resolve(cachedResponse)
                    } else {
                        resolve(this.getData(apiPath, params));
                        this.testMethod();
                    }
                });
            } else {
                resolve(this.getData(apiPath, params));
                this.testMethod();
            }
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }

    getteam_credit_Response(matchId) {
        let apiPath = '/rest/v3/fantasy-match-credits/' + matchId + '/';
        let params = {
            matchId
        }
        // console.log(params);
        let cacheKey = 'match|' + matchId + '|full_card';
        return new Promise((resolve, reject) => {
            if (memCacheEnable) {
                CacherLogic.getCachedData(cacheKey).then((cachedResponse) => {
                    if (cachedResponse && cachedResponse != null) {
                        resolve(cachedResponse)
                    } else {
                        resolve(this.getDatanew(apiPath, params));
                    }
                });
            } else {
                resolve(this.getDatanew(apiPath, params));
            }
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }



    getMatchResponse(matchId) {
        let apiPath = '/rest/v2/match/' + matchId + '/overs_summary/';
        let params = {
            matchId
        }
        let cacheKey = 'match|' + matchId + '|full_card';
        return new Promise((resolve, reject) => {
            if (memCacheEnable) {
                CacherLogic.getCachedData(cacheKey).then((cachedResponse) => {
                    if (cachedResponse && cachedResponse != null) {
                        resolve(cachedResponse)
                    } else {
                        resolve(this.getData(apiPath, params));
                    }
                });
            } else {
                resolve(this.getData(apiPath, params));
            }
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }


    getSeasonteamResponse(season_key, season_team_key) {
        let apiPath = '/rest/v2/season/' + season_key + '/team/' + season_team_key + '/';
        let params = {}
        let cacheKey = 'match|' + season_key + '|full_card';
        return new Promise((resolve, reject) => {
            if (memCacheEnable) {
                CacherLogic.getCachedData(cacheKey).then((cachedResponse) => {
                    if (cachedResponse && cachedResponse != null) {
                        resolve(cachedResponse)
                    } else {
                        resolve(this.getData(apiPath, params));
                    }
                });
            } else {
                resolve(this.getData(apiPath, params));
            }
        }).catch(function (err) {
            console.error('Oops we have an error', err);
            reject(err);
        });
    }


    getData(source_path, queryParams = {}) {
        console.log('getdata called')
        let newHost = host
        if (source_path.startsWith('/rest/add-on/spider-')) {
            newHost = Config.backend.spiderHost
        }

        var promiseObj = new Promise((resolve, reject) => {
            if (queryParams.hasOwnProperty("access_token")) {
                queryParams.access_token = Token.key
            } else {
                queryParams['access_token'] = Token.key
            }

            this.formateUrl = newHost + source_path;

            var options = {
                url: this.formateUrl,
                qs: queryParams,
                method: 'GET',
                headers: this.headers,
                json: true,
                gzip: true
            }
            console.log(options);
            var parameter_match_id = options.qs.matchId;
            //    console.log(parameter_match_id);///important for get data 
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    if (body.status_code == 403 && body.status_msg == 'Invalid Access Token') {
                        lastQuery = queryParams
                        this.setAccessToken().then(() => {
                            resolve(this.getData(source_path, lastQuery));
                        }).catch((res) => {
                            console.log("catch", res);
                        })
                    } else if (body.status_code == 403 && body.status_msg == 'InvalidAccessToken') {
                        lastQuery = queryParams
                        this.setAccessToken().then(() => {
                            resolve(this.getData(source_path, lastQuery));
                        }).catch((res) => {
                            console.log("catch", res);
                        })
                    } else {
                        if (body.status_code == 200 && memCacheEnable) {
                            if (body.data.card && body.data.card.cache_key) {
                                CacherLogic.setCache(body.data.card.cache_key, body.data, body.expires);

                            }
                        }

                        // var cnt = body.data.card.players;
                        // console.log(cnt);


                        overs_summary.find({
                                'match_key': parameter_match_id,
                            },
                            function (err, player_data) {
                                if (player_data == "") {
                                    if (body.data.card.status == "completed") {
                                        var first_match = body.data.card.teams.a.match.playing_xi.length;
                                        for (var i = 0; i < first_match; i++) {
                                            var over_data = new overs_summary({
                                                match_key: parameter_match_id,
                                                player_key: body.data.card.teams.a.match.playing_xi[i]

                                            });

                                            over_data.save(function (err, match) {
                                                if (err) return console.error(err);
                                                console.log("match first save");

                                            });


                                        }

                                        var secound_match = body.data.card.teams.b.match.playing_xi.length;
                                        for (var j = 0; j < secound_match; j++) {
                                            var over_data1 = new overs_summary({
                                                match_key: parameter_match_id,
                                                player_key: body.data.card.teams.b.match.playing_xi[j]

                                            });

                                            over_data1.save(function (err, match) {
                                                if (err) return console.error(err);
                                                console.log("match secound save");

                                            });


                                        }




                                    }

                                } else {
                                    var player_cnt = player_data.length;
                                    if (player_cnt > 0) {
                                        player_data.forEach(function (countElement) {

                                            //Constant
                                            var HALF_CENTURY_RUNS = 50;
                                            var FULL_CENTURY_RUNS = 100;

                                            var WICKET_FOUR_FACTOR_COUNT = 4;
                                            var WICKET_FIVE_FACTOR_COUNT = 5;

                                            let player_name = countElement.player_key;

                                            var totalRunPointsfactor = 0.5;
                                            var fourcntPointsfactor = 0.5;
                                            var sixcntPointsfactor = 1;
                                            var centuryPointsfactor = 8;
                                            var halfCenturyPointsfactor = 4;

                                            var wicketPointsfactor = 10;
                                            var maiden_oversPointsfactor = 4;
                                            var four_wicketPointsfactor = 4;
                                            var five_wicketPointsfactor = 8;

                                            var catchScorePointsfactor = 4;
                                            var stumpOrRunOutPointsfactor = 6;

                                            //Economy rates
                                            var Below4RunsPerOverEcoRateFactor = 3
                                            var Between4_4_99RunsPerOverEcoRateFactor = 2
                                            var Between5_6RunsPerOverEcoRateFactor = 1
                                            var Between9_10RunsPerOverEcoRateFactor = -1
                                            var Between10_1_11RunsPerOverEcoRateFactor = -2
                                            var Above11RunsPerOverEcoRateFactor = -3;


                                            //player STRIKE RATE
                                            var Between60_70Runsper100Balls = -1;
                                            var Between50_59_9RunsPer100Balls = -2;
                                            var Below_50_Runsper100Balls = -3;



                                            //console.log(body.data.card.players[player_name].match.innings[1].batting.fours);

                                            if (body.data.card.players[player_name].match.innings[1].batting.fours == null) {
                                                var playerFour = 0;

                                            } else {
                                                playerFour = body.data.card.players[player_name].match.innings[1].batting.fours;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].batting.sixes == null) {
                                                var playerSix = 0;

                                            } else {
                                                playerSix = body.data.card.players[player_name].match.innings[1].batting.sixes;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].batting.dots == null) {
                                                var playerBattingDot = 0;

                                            } else {
                                                playerBattingDot = body.data.card.players[player_name].match.innings[1].batting.dots;

                                            }


                                            if (body.data.card.players[player_name].match.innings[1].batting.runs == null) {
                                                var playerBattingTotalRuns = 0;

                                            } else {
                                                playerBattingTotalRuns = body.data.card.players[player_name].match.innings[1].batting.runs;

                                            }


                                            if (body.data.card.players[player_name].match.innings[1].bowling.balls == null) {
                                                var playerBowlBalls = 0;

                                            } else {
                                                playerBowlBalls = body.data.card.players[player_name].match.innings[1].bowling.balls;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].bowling.extras == null) {
                                                var playerBowlingExtras = 0;

                                            } else {
                                                playerBowlingExtras = body.data.card.players[player_name].match.innings[1].bowling.extras;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].bowling.overs == null) {
                                                var PlayerBowlingOver = 0;

                                            } else {
                                                PlayerBowlingOver = body.data.card.players[player_name].match.innings[1].bowling.overs;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].bowling.runs == null) {
                                                var PlayerBowlingRuns = 0;

                                            } else {
                                                PlayerBowlingRuns = body.data.card.players[player_name].match.innings[1].bowling.runs;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].bowling.wickets == null) {
                                                var PlayerBowlingwickets = 0;

                                            } else {
                                                PlayerBowlingwickets = body.data.card.players[player_name].match.innings[1].bowling.wickets;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].fielding.catches == null) {
                                                var PlayerFieldingCatch = 0;

                                            } else {
                                                PlayerFieldingCatch = body.data.card.players[player_name].match.innings[1].fielding.catches;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].fielding.runouts == null) {
                                                var PlayerFieldingRunouts = 0;

                                            } else {
                                                PlayerFieldingRunouts = body.data.card.players[player_name].match.innings[1].fielding.runouts;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].fielding.stumbeds == null) {
                                                var PlayerFieldingStump = 0;

                                            } else {
                                                PlayerFieldingStump = body.data.card.players[player_name].match.innings[1].fielding.stumbeds;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].bowling.maiden_overs == null) {
                                                var PlayerBowlingMaidenOvers = 0;

                                            } else {
                                                PlayerBowlingMaidenOvers = body.data.card.players[player_name].match.innings[1].bowling.maiden_overs;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].bowling.economy == null) {
                                                var PlayerBowlingEconomy = 0;

                                            } else {
                                                PlayerBowlingEconomy = body.data.card.players[player_name].match.innings[1].bowling.economy;

                                            }

                                            if (body.data.card.players[player_name].match.innings[1].batting.strike_rate == null) {
                                                var PlayerBatStrikeRate = 0;

                                            } else {
                                                PlayerBatStrikeRate = body.data.card.players[player_name].match.innings[1].batting.strike_rate;

                                            }


                                            //   console.log(playerFour);

                                            //   var playerSix = body.data.card.players[player_name].match.innings[1].batting.sixes;


                                            //var playerBattingDot = body.data.card.players[player_name].match.innings[1].batting.dots;


                                            //  var playerBattingTotalRuns = body.data.card.players[player_name].match.innings[1].batting.runs;

                                            //  var playerBowlBalls = body.data.card.players[player_name].match.innings[1].bowling.balls;

                                            // var playerBowlingExtras = body.data.card.players[player_name].match.innings[1].bowling.extras;

                                            //var PlayerBowlingOver = body.data.card.players[player_name].match.innings[1].bowling.overs;

                                            //var PlayerBowlingRuns = body.data.card.players[player_name].match.innings[1].bowling.runs;
                                            //  var PlayerBowlingwickets = body.data.card.players[player_name].match.innings[1].bowling.wickets;
                                            //  var PlayerFieldingCatch = body.data.card.players[player_name].match.innings[1].fielding.catches;
                                            //var PlayerFieldingRunouts = body.data.card.players[player_name].match.innings[1].fielding.runouts;
                                            //   var PlayerFieldingStump = body.data.card.players[player_name].match.innings[1].fielding.stumbeds;
                                            //  var PlayerBowlingMaidenOvers = body.data.card.players[player_name].match.innings[1].bowling.maiden_overs;
                                            //  var PlayerBowlingEconomy = body.data.card.players[player_name].match.innings[1].bowling.economy;
                                            //    var PlayerBatStrikeRate = body.data.card.players[player_name].match.innings[1].batting.strike_rate;

                                            //Player Batting score calculaor    
                                            var calculateScore = parseInt(playerBattingTotalRuns * totalRunPointsfactor) + parseInt(playerFour * fourcntPointsfactor) + parseInt(playerSix * sixcntPointsfactor);

                                            if (playerBattingTotalRuns > HALF_CENTURY_RUNS && playerBattingTotalRuns < FULL_CENTURY_RUNS) {
                                                calculateScore = parseInt(calculateScore) + parseInt(halfCenturyPointsfactor);
                                            } else if (playerBattingTotalRuns >= FULL_CENTURY_RUNS) {
                                                calculateScore = parseInt(calculateScore) + parseInt(centuryPointsfactor);
                                            }



                                            //Player Bowling score calculaor
                                            calculateScore = parseInt(calculateScore) + parseInt(PlayerBowlingwickets * wicketPointsfactor) + parseInt(PlayerBowlingMaidenOvers * maiden_oversPointsfactor);

                                            if (PlayerBowlingwickets == WICKET_FOUR_FACTOR_COUNT) {
                                                calculateScore = parseInt(calculateScore) + parseInt(four_wicketPointsfactor);

                                            } else if (PlayerBowlingwickets >= WICKET_FIVE_FACTOR_COUNT) {
                                                calculateScore = parseInt(calculateScore) + parseInt(five_wicketPointsfactor);
                                            }

                                            // //Economy

                                            if (PlayerBowlingEconomy < 4) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Below4RunsPerOverEcoRateFactor);
                                            } else if (PlayerBowlingEconomy < 5) //in between 4 - 4.99
                                            {
                                                calculateScore = parseInt(calculateScore) + parseInt(Between4_4_99RunsPerOverEcoRateFactor);
                                            } else if (PlayerBowlingEconomy < 6) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Between5_6RunsPerOverEcoRateFactor);
                                            } else if (PlayerBowlingEconomy >= 9 && PlayerBowlingEconomy <= 10) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Between9_10RunsPerOverEcoRateFactor);
                                            } else if (PlayerBowlingEconomy > 10 && PlayerBowlingEconomy <= 11) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Between10_1_11RunsPerOverEcoRateFactor);
                                            } else if (PlayerBowlingEconomy > 11) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Above11RunsPerOverEcoRateFactor);
                                            }

                                            // // StrikeRate

                                            if (PlayerBatStrikeRate >= 50) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Below_50_Runsper100Balls);

                                            } else if (PlayerBatStrikeRate >= 60) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Between50_59_9RunsPer100Balls);

                                            } else if (PlayerBatStrikeRate >= 70) {
                                                calculateScore = parseInt(calculateScore) + parseInt(Between60_70Runsper100Balls);

                                            }


                                            // //Player Fieldign score calculaor
                                            calculateScore = parseInt(calculateScore) + parseInt(PlayerFieldingCatch) * parseInt(catchScorePointsfactor) + parseInt(PlayerFieldingStump) * parseInt(stumpOrRunOutPointsfactor) +
                                                parseInt(PlayerFieldingRunouts) * parseInt(stumpOrRunOutPointsfactor);

                                            // if (calculateScore > 0) {
                                            //     var totalCalculate = calculateScore;

                                            // } else {
                                            //     var totalCalculate = 0;

                                            // }


                                            console.log(calculateScore);





                                            overs_summary.update({
                                                'player_key': player_name,



                                            }, {
                                                $set: {
                                                    "batting_four": playerFour,
                                                    "batting_six": playerSix,
                                                    "batting_dots": playerBattingDot,
                                                    "batting_runs": playerBattingTotalRuns,
                                                    "bowling_balls": playerBowlBalls,
                                                    "bowling_extras": playerBowlingExtras,
                                                    "bowling_overs": PlayerBowlingOver,
                                                    "bowling_runs": PlayerBowlingRuns,
                                                    "bowling_wicket": PlayerBowlingwickets,
                                                    "fielding_catch": PlayerFieldingCatch,
                                                    "fielding_runouts": PlayerFieldingRunouts,
                                                    "fielding_stumbeds": PlayerFieldingStump,
                                                    "bowling_maiden_overs": PlayerBowlingMaidenOvers,
                                                    "bowling_economy": PlayerBowlingEconomy,
                                                    "bat_strike_rate": PlayerBatStrikeRate,
                                                    "player_score": parseInt(calculateScore),



                                                }
                                            }, function (err, results) {
                                                console.log(results);


                                            })

                                        });
                                    }




                                }
                                //  results.length

                            });





                    }
                }
            })
        });



        return promiseObj;


    }

    testMethod() {
        console.log("function called...A");
    }

}

module.exports = new Oversummery;