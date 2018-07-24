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

mongoose.connect('mongodb://localhost:27017/adminpanel');

var TeamSchema_credit_point = mongoose.Schema({
    player_key: String,
    player_name: String,
    player_role: String,
    team_name: String,
    player_credit_value: String,
    player_match_key: String
});

var Team_credit_value = mongoose.model('Team_credit_point', TeamSchema_credit_point, 'team_credit_point');
let host = Config.backend.host
let lastQuery = {}
let memCacheEnable = Config.enable_memcache
if (memCacheEnable) {
    CacherLogic = require('./cacherLogics');
}
class Cricketcrditapi {
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
            //  console.log(options);

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
                        // console.log(body.data);

                        Team_credit_value.find({
                            'player_match_key': parameter_match_id
                        }, function (err, matchdata) {

                            if (err) return console.error(err);
                            else {
                                if (!empty(matchdata)) {
                                    //  console.log("team already present");
                                    //   this.statusCode = 302;


                                    // return matchdata;
                                    resolve(matchdata);
                                } else {

                                    if (body.data == "" || body.data == null) {
                                        resolve("player credit point data not present")




                                    } else {

                                        var point_cnt = body.data.fantasy_points;
                                        //    console.log(body.data);
                                        if (body.data.fantasy_points) {
                                            for (var t = 0; t < point_cnt.length; t++) {
                                                var player_key = body.data.fantasy_points[t].player;
                                                var player_credit_value = body.data.fantasy_points[t].credit_value;
                                                var player_name = body.data.players[player_key].fullname;
                                                var player_role = body.data.players[player_key].seasonal_role;
                                                var team_key = body.data.players[player_key].team_key;
                                                var player_team = body.data.teams[team_key].name;

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

                                                    if (err) return console.error(err);
                                                    Team_credit_value.find({
                                                        'player_match_key': parameter_match_id
                                                    }, function (err, matchdata) {

                                                        resolve(matchdata);
                                                    });

                                                    //resolve(team);

                                                });
                                            }

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

module.exports = new Cricketcrditapi;