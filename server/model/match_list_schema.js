const mongoose = require("mongoose");
const TodoSchema = new mongoose.Schema({
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
    team_key_b: String
});

module.exports = mongoose.model('Matchlist', TodoSchema, 'CricketMatches');