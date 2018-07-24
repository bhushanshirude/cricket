const express = require('express')
const app = express()
let nunjucks = require('nunjucks');
let moment = require('moment')
let bodyParser = require('body-parser');
let routes = require('./core/routes');
let config = require('./config');
var mongoose = require('mongoose');
var team_create = require('./core/team_create');
var contestschma = require('./core/contest_create');
var contestjoinschma = require('./core/contest_join');
var userschema = require('./core/user');
var userteam = require('./core/userteam');
var image = require('./core/image');

// var match_list = require('./core/match_list');
// var match_list_new = require('./core/match_list_new');
let nunjucksEnv = nunjucks.configure('./views', {
    autoescape: true,
    express: app,
    cache: false,
});
app.set('view engine', 'html');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/', routes);
// app.use('/match_list', match_list); //call list json match
app.use('/team_create', team_create);
app.use('/contest', contestschma);
app.use('/contest_join', contestjoinschma);
app.use('/user', userschema);

app.use('/userteam', userteam);
app.use('/image', image);

// app.use('/match_list_new', match_list_new);
app.use('/static', express.static(__dirname + '/assets'));
// Format the datatime
nunjucksEnv.addGlobal('dateFormat', function (datetime, pattern) {
    return moment(datetime).format(pattern);
});
app.listen(config.port, function () {
    console.log('Server started at PORT:' + config.port);
});