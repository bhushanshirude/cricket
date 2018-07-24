let http = require('http');
let https = require('https');
let request = require('request');
let Config = require('../config');
let Token = require('./auth')
const querystring = require('querystring');
var mongoose = require('mongoose');
const match_list_schema = require('../model/match_list_schema');
var empty = require('is-empty');
var CacherLogic;
const express = require('express')
const app = express()
let host = Config.backend.host
let lastQuery = {}
let memCacheEnable = Config.enable_memcache
if (memCacheEnable) {
    CacherLogic = require('./cacherLogics');
}
class Matchlistapi {
    constructor() {
        this.formateUrl = '',
            this.headers = {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
    }

    getmatch_list() {
        return new Promise((resolve, reject) => {
            match_list_schema.find({

                },

                function (err, results) {
                    if (err) {
                        console.log(err);
                    }
                    //  console.log(results);

                    resolve(results);

                    //  res.status(200).json({ status: "Success", message: "your Match_list" ,data:results});

                }
            );
        })
    }

    getmatch_list_date(start_date, end_date) {
        return new Promise((resolve, reject) => {
            var gte = start_date;
            var lte = end_date;
            match_list_schema.find({
                    "match_start_date": {
                        '$gte': gte,
                        '$lt': lte
                    }
                },
                function (err, results) {
                    resolve(results);


                }
            );
        })
    }

}

module.exports = new Matchlistapi;