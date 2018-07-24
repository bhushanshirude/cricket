const mongoose = require("mongoose");
const Matchoversummery = mongoose.Schema({
    match_key: {
        type: String,
        default: null
    },
    player_key: {
        type: String,
        default: null
    },
    batting_four: {
        type: Number,
        default: 0
    },
    batting_six: {
        type: Number,
        default: 0
    },
    batting_dots: {
        type: Number,
        default: 0
    },
    batting_runs: {
        type: Number,
        default: 0
    },
    bowling_balls: {
        type: Number,
        default: 0
    },
    bowling_extras: {
        type: Number,
        default: 0
    },
    bowling_overs: {
        type: Number,
        default: 0
    },
    bowling_runs: {
        type: Number,
        default: 0
    },
    bowling_wicket: {
        type: Number,
        default: 0
    },
    bowling_maiden_overs: {
        type: Number,
        default: 0
    },
    fielding_catch: {
        type: Number,
        default: 0
    },
    fielding_runouts: {
        type: Number,
        default: 0
    },
    fielding_stumbeds: {
        type: Number,
        default: 0
    },
    bowling_economy: {
        type: Number,
        default: 0
    },
    bat_strike_rate: {
        type: Number,
        default: 0
    },

    player_score: {
        type: Number,
        default: 0

    }





});
module.exports = mongoose.model("match_over_summery", Matchoversummery);