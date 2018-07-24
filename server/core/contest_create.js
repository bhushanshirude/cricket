var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var mongoose = require('mongoose');
const contest_schema = require('../model/contest_create_schema');
var ObjectID = require('mongodb').ObjectID;
router.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Content-Type", "application/x-www-form-urlencoded");
    res.header("Content-Type", "multipart/form-data");
    res.header("Content-Type", "text/plain");
    next();
});
router.post('/add', function (req, res, next) {
    var match_key = req.body.match_key;
    var match_id = req.body.match_id;

    var title = req.body.title;
    var contestEntryFee = req.body.contest.contestEntryFee;
    var allowMultipleTeam = req.body.contest.allowMultipleTeam;
    var contestCreatedBy = req.body.contest.contestCreatedBy;
    var contestSize = req.body.contest.contestSize;
    var winningAmount = req.body.contest.winningAmount;
    var contestKey = req.body.contest.contestKey;
    var referralCode = req.body.contest.referralCode;


    var contest_create = new contest_schema({
        match_key: match_key,
        match_id: match_id,
        title: title,
        contest: {
            contestEntryFee: contestEntryFee,
            allowMultipleTeam: allowMultipleTeam,
            contestCreatedBy: contestCreatedBy,
            contestSize: contestSize,
            winningAmount: winningAmount,
            contestKey: contestKey,
            referralCode: referralCode,
        }


    });

    contest_create.save().then(results => {
        contest_schema.find({
                "contest.referralCode": referralCode,

            },
            function (err, results) {
                if (results != "") {
                    res.status(200).json({
                        status: "Success",
                        msg: "contest Created Succesfully ",
                        data: results
                    });
                }

            });
    });
});
router.post('/list', function (req, res, next) {
    match_id = req.body.match_id;

    contest_schema.find({
            "match_id": match_id,

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

module.exports = router;