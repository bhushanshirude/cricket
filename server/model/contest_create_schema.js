const mongoose = require("mongoose");
const contestSchema = mongoose.Schema({
    match_id: {
        type: mongoose.Schema.ObjectId,
        ref: "cricketmatches"
    },
    match_key: {
        type: String,

    },
    title: {
        type: String
    },
    contest: {
        contestEntryFee: {
            type: String,
            default: null
        },
        allowMultipleTeam: {
            type: Boolean,
            default: null
        },
        contestCreatedBy: {
            type: String,
            default: null
        },
        contestSize: {
            type: String,
            default: null
        },
        winningAmount: {
            type: String,
            default: null
        },
        contestKey: {
            type: String,
            default: null
        },
        referralCode: {
            type: String,
            default: null
        }
    },
    contest_join_cnt: {
        type: String,
        default: 0
    }

});
module.exports = mongoose.model("contest", contestSchema);