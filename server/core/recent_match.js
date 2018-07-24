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

// mongoose.connect('mongodb://localhost:27017/adminpanel');

// var TeamSchema_credit_point= mongoose.Schema({
//     player_key:String,
//     player_name: String,
//     player_role: String,
//     team_name: String,
//     player_credit_value:String,
//     player_match_key:String
//    });

//    var Team_credit_value= mongoose.model('Team_credit_point', TeamSchema_credit_point, 'team_credit_point');

// let host = Config.backend.host
let host = Config.backend.host
let lastQuery = {}

let memCacheEnable = Config.enable_memcache

if (memCacheEnable) {
    CacherLogic = require('./cacherLogics');
}

class Recentmatchapi {
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

            request(options, function(error, response, body) {

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

    recentMatchesResponse() {
        var card_type = "micro_card";
        let apiPath = '/rest/v2/recent_matches/';
        let params = { card_type }
            // console.log(params);
            // let cacheKey = 'match|'+matchId+'|full_card';
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
        }).catch(function(err) {
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

            console.log(options);
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
                        console.log(body.data);


                    }
                }
            })
        })


    }
}

module.exports = new Recentmatchapi;