const mongoose = require("mongoose");
const userteamSchema = mongoose.Schema({
    player_key: String,
    match_id: String,
    user_id: String,
    player_role: String,
    player_name: String,
    team_id: String,
    player_credit_point: Number,
    captain: {
        type: Number,
        default: 0
    },
    vice_captain: {
        type: Number,
        default: 0
    },
    team_name: {
        type: String,
        default: null
    },
    team_key: {
        type: String,
        default: "team1"
    }
});
module.exports = mongoose.model("matchteam", userteamSchema);