const mongoose = require("mongoose");
const userteams = mongoose.Schema({
    user: {
        user_key: {
            type: mongoose.Schema.ObjectId,
            ref: "users"
        },
        match_key: {
            type: mongoose.Schema.ObjectId,
            ref: "matchlists"
        },
        team: {
            team_id: {
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
                }
            }


        }
    }
});

module.exports = mongoose.model("userteams", userteams);