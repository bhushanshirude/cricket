var keystone = require('keystone');
var CricketMatches = new keystone.List('CricketMatches');
CricketMatches.add({
    related_name: {
        type: String
    },
    name: {
        type: String
    },
    title: {
        type: String
    },
    venue: {
        type: String
    },
    match_key: {
        type: String
    },
    status: {
        type: String
    },
    season_key: {
        type: String
    },
    match_result: {
        type: String
    },
    season_team_key_a: {
        type: String
    },
    season_team_key_b: {
        type: String
    },
    team_key_a: {
        type: String
    },
    team_key_b: {
        type: String
    },
    match_start_date: {
        type: String
    }
});
CricketMatches.relationship({
    ref: 'CricketMatches',
    path: 'contests',
    refPath: 'match_key'
});

CricketMatches.defaultColumns = 'match_key, related_name|15%, name|25%, venue|10%, status|10%, match_result|10%, match_start_date|10%';
CricketMatches.register();