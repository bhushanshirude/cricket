const mongoose = require("mongoose");
const contest_join_new = mongoose.Schema({
    match_key: {
        type: String,
    },
    match_id: {
        type: mongoose.Schema.ObjectId,
        ref: "cricketmatches"
    },
    contest_key: {
        type: mongoose.Schema.ObjectId,
        ref: "contest"
    },
    contest_referral_code: {
        type: String,
        default: null

    },
    user: {
        user_key: {
            type: String,
            default: null
        },
        user_code: {
            type: String,
            default: null
        },
        user_pic: {
            type: String,
            default: null
        },
        user_score: {
            type: Number
        },
        team: {
            team_key: {
                type: String,
                default: null
            },
            captain: {
                type: String,
                default: null
            },
            vice_captain: {
                type: String,
                default: null
            },
            player1: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player2: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player3: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player4: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player5: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player6: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player7: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player8: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player9: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player10: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            },
            player11: {
                player_key: {
                    type: String
                },
                player_role: {
                    type: String
                },
                player_name: {
                    type: String
                },
                player_credit_point: {
                    type: String
                },
                captain: {
                    type: String
                },
                vice_captain: {
                    type: String
                },
                player_score: {
                    type: Number
                }
            }




        }
    }


});

module.exports = mongoose.model("contest_join", contest_join_new);