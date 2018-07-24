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
const app = express();


mongoose.connect('mongodb://localhost:27017/adminpanel');


//mongoose.connect('mongodb: //fantasycraz:fantasycraz1@ds137631.mlab.com:37631/fantasycraz');


// get reference to database
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));


// define Schema
var MatchSchema = mongoose.Schema({
    status: String,
    related_name: String,
    name: String,
    title: String,
    season_key: String,
    format: String,
    venue: String,
    match_key: String,
    match_result: String,
    match_start_date: String,
    season_team_key_a: String,
    season_team_key_b: String,
    team_key_a: String,
    team_key_b: String,
    month: String


});

// compile schema to model
var Match = mongoose.model('Match', MatchSchema, 'CricketMatches');

// var TeamSchema_relate_match = mongoose.Schema({
//     team_key: String,
//     team_name: String,
//     player_key: String,
//     match_key: String,
//     season_team_key: String
// });
// var Team = mongoose.model('Team', TeamSchema_relate_match, 'teamstore');
//    var TeamSchema_credit_point= mongoose.Schema({
//     player_key:String,
//     player_name: String,
//     player_role: String,
//     team_name: String,
//     player_credit_value:String,
//     player_match_key:String
//    });
//    var Team_credit_value= mongoose.model('Team_credit_point', TeamSchema_credit_point, 'team_credit_point');
// configuring backend host 
let host = Config.backend.host
let lastQuery = {}

let memCacheEnable = Config.enable_memcache

if (memCacheEnable) {
    CacherLogic = require('./cacherLogics');
}
class CricketAPIServices {
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
        console.log(month);
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
    getMatchResponse(matchId) {
        let apiPath = '/rest/v2/match/' + matchId + '/';
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
        let apiPath = '/rest/v2/match/' + matchId + '/';
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
        return new Promise((resolve, reject) => {
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
                        resolve(body.data);
                        if (!empty(body.data.card)) {
                            var team1 = body.data.card.teams.a.match.players;
                            for (var t = 0; t < team1.length; t++) {
                                var teama = new Team({
                                    team_key: body.data.card.teams.a.key,
                                    team_name: body.data.card.teams.a.name,
                                    player_key: body.data.card.teams.a.match.players[t],
                                    match_key: parameter_match_id,
                                    season_team_key: body.data.card.teams.a.match.season_team_key,
                                });
                                teama.save(function (err, team) {
                                    if (err) return console.error(err);
                                    console.log("Team first save");
                                    //  console.log(book.name + " saved to bookstore collection.");
                                });
                            }
                            var team2 = body.data.card.teams.b.match.players;
                            for (var b = 0; b < team2.length; b++) {
                                var teamb = new Team({
                                    team_key: body.data.card.teams.b.key,
                                    team_name: body.data.card.teams.b.name,
                                    player_key: body.data.card.teams.b.match.players[t],
                                    match_key: parameter_match_id,
                                    season_team_key: body.data.card.teams.b.match.season_team_key,
                                });
                                teamb.save(function (err, team) {
                                    if (err) return console.error(err);
                                    console.log("Team SECOUND save");
                                    //  console.log(book.name + " saved to bookstore collection.");
                                });
                            }
                        }
                        if (!empty(body.data.months)) {

                            Match.find({
                                'month': body.data.current_month
                            }, function (err, result) {

                                if (result != "") {
                                    var upkeys = body.data.months[0].days;
                                    for (var i = 0; i < upkeys.length; i++) {
                                        var upkeys1 = body.data.months[0].days[i].matches;
                                        for (var j = 0; j < upkeys1.length; j++) {

                                            var date = new Date(body.data.months[0].days[i].matches[j].start_date.iso);
                                            var year = date.getFullYear();
                                            var month = date.getMonth() + 1;
                                            var dt = date.getDate();
                                            var hour = date.getHours();
                                            var min = date.getMinutes();
                                            var sec = date.getSeconds();
                                            if (dt < 10) {
                                                dt = '0' + dt;
                                            }
                                            if (month < 10) {
                                                month = '0' + month;
                                            }
                                            var start_date = year + '-' + month + '-' + dt + ' ' + hour + ':' + min + ':' + sec;

                                            Match.update({
                                                'month': body.data.current_month,

                                                $set: {

                                                    "related_name": body.data.months[0].days[i].matches[j].related_name,
                                                    "name": body.data.months[0].days[i].matches[j].name,
                                                    "title": body.data.months[0].days[i].matches[j].title,
                                                    "format": body.data.months[0].days[i].matches[j].formate,
                                                    "venue": body.data.months[0].days[i].matches[j].venue,
                                                    "match_key": body.data.months[0].days[i].matches[j].key,
                                                    "status": body.data.months[0].days[i].matches[j].status,
                                                    "season_key": body.data.months[0].days[i].matches[j].season.key,
                                                    "match_result": body.data.months[0].days[i].matches[j].msgs.result,
                                                    "season_team_key_a": body.data.months[0].days[i].matches[j].teams.a.match.season_team_key,
                                                    "season_team_key_b": body.data.months[0].days[i].matches[j].teams.b.match.season_team_key,
                                                    "team_key_a": body.data.months[0].days[i].matches[j].teams.a.key,
                                                    "team_key_b": body.data.months[0].days[i].matches[j].teams.b.key,
                                                    "match_start_date": start_date,
                                                    "month": body.data.current_month,


                                                }
                                            }, function (err, results) {
                                                if (err) return console.error(err);
                                                console.log("match update");


                                            });
                                        }
                                    }


                                } else {
                                    var keys = body.data.months[0].days;
                                    for (var i = 0; i < keys.length; i++) {
                                        // console.log(body.data.months[0].days[i].matches);
                                        var keys1 = body.data.months[0].days[i].matches;

                                        for (var j = 0; j < keys1.length; j++) {
                                            // console.log(body.data.months[0].days[i].matches[j].status);
                                            // console.log(body.data.months[0].days[i].matches[j].teams.a.match.season_team_key);
                                            // a document instance
                                            var date = new Date(body.data.months[0].days[i].matches[j].start_date.iso);
                                            var year = date.getFullYear();
                                            var month = date.getMonth() + 1;
                                            var dt = date.getDate();
                                            var hour = date.getHours();
                                            var min = date.getMinutes();
                                            var sec = date.getSeconds();
                                            if (dt < 10) {
                                                dt = '0' + dt;
                                            }
                                            if (month < 10) {
                                                month = '0' + month;
                                            }
                                            var start_date = year + '-' + month + '-' + dt + ' ' + hour + ':' + min + ':' + sec;
                                            //  console.log(year+'-' + month + '-'+dt);
                                            var match1 = new Match({
                                                related_name: body.data.months[0].days[i].matches[j].related_name,
                                                name: body.data.months[0].days[i].matches[j].name,
                                                title: body.data.months[0].days[i].matches[j].title,
                                                format: body.data.months[0].days[i].matches[j].formate,
                                                venue: body.data.months[0].days[i].matches[j].venue,
                                                match_key: body.data.months[0].days[i].matches[j].key,
                                                status: body.data.months[0].days[i].matches[j].status,
                                                season_key: body.data.months[0].days[i].matches[j].season.key,
                                                match_result: body.data.months[0].days[i].matches[j].msgs.result,
                                                season_team_key_a: body.data.months[0].days[i].matches[j].teams.a.match.season_team_key,
                                                season_team_key_b: body.data.months[0].days[i].matches[j].teams.b.match.season_team_key,
                                                team_key_a: body.data.months[0].days[i].matches[j].teams.a.key,
                                                team_key_b: body.data.months[0].days[i].matches[j].teams.b.key,
                                                match_start_date: start_date,
                                                month: body.data.current_month,

                                            });
                                            match1.save(function (err, match) {
                                                if (err) return console.error(err);
                                                console.log("match save");
                                            });
                                        }
                                    }
                                }


                            });



                            //   console.log(body.data.current_month);

                        }
                    }
                }
            })
        })
    }
    getDatanew(source_path, queryParams = {}) {
        console.log('getdatanew called')
        let newHost = host
        if (source_path.startsWith('/rest/add-on/spider-')) {
            newHost = Config.backend.spiderHost
        }
        return new Promise((resolve, reject) => {
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
            var parameter_match_id = options.qs.matchId;
            //console.log(parameter_match_id);///important for get data 
            request(options, (error, response, body) => {
                if (error) {
                    console.log(error)
                    reject(error);
                } else {
                    if (body.status_code == 403 && body.status_msg == 'Invalid Access Token') {
                        lastQuery = queryParams
                        this.setAccessToken().then(() => {
                            resolve(this.getDatanew(source_path, lastQuery));
                        }).catch((res) => {
                            console.log("catch", res);
                        })
                    } else if (body.status_code == 403 && body.status_msg == 'InvalidAccessToken') {
                        lastQuery = queryParams
                        this.setAccessToken().then(() => {
                            resolve(this.getDatanew(source_path, lastQuery));
                        }).catch((res) => {
                            console.log("catch", res);
                        })
                    } else {
                        if (body.status_code == 200 && memCacheEnable) {
                            if (body.data.card && body.data.card.cache_key) {
                                CacherLogic.setCache(body.data.card.cache_key, body.data, body.expires);
                            }
                        }
                        resolve(body.data);
                        Team_credit_value.find({
                            'player_match_key': parameter_match_id
                        }, function (err, matchdata) {
                            if (err) return console.error(err);
                            else {
                                if (!empty(matchdata)) {
                                    //  console.log("team already present");
                                    //   this.statusCode = 302;
                                    this.setHeader('Location', '/data');
                                    this.end();
                                    // return matchdata;
                                } else {
                                    var point_cnt = body.data.fantasy_points;
                                    if (body.data.fantasy_points) {
                                        for (var t = 0; t < point_cnt.length; t++) {
                                            var player_key = body.data.fantasy_points[t].player;
                                            var player_credit_value = body.data.fantasy_points[t].credit_value;
                                            var player_name = body.data.players[player_key].fullname;
                                            var player_role = body.data.players[player_key].seasonal_role;
                                            var team_key = body.data.players[player_key].team_key;
                                            var player_team = body.data.teams[team_key].name;
                                            //   console.log(player_key);
                                            //   console.log(player_credit_value);
                                            //   console.log(player_name);
                                            //   console.log(player_role);
                                            //   console.log(player_team);
                                            var team_credit_value_new = new Team_credit_value({
                                                player_key: player_key,
                                                player_credit_value: player_credit_value,
                                                player_name: player_name,
                                                player_role: player_role,
                                                team_name: player_team,
                                                player_match_key: parameter_match_id,
                                            });
                                            team_credit_value_new.save(function (err, team) {
                                                if (err) return console.error(err);
                                                console.log("Team credit value save here");
                                            });
                                        }
                                    }
                                }
                            }
                        });
                    }
                }
            })
        })
    }
}
module.exports = new CricketAPIServices;