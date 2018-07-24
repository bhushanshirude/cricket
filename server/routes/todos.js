var express = require('express');
var router = express.Router();

var mongoose = require('mongoose');
//var Todo = require('./Todo.js');
// define Schema

mongoose.connect('mongodb://localhost:27017/adminpanel');
var db = mongoose.connection;

db.on('error', console.error.bind(console, 'connection error:'));

db.once('open', function() {
    console.log("Connection Successful!");

    // define Schema
    var TodoSchema = new mongoose.Schema({
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
    // compile schema to model
    var MatchData = mongoose.model('Todos', TodoSchema, 'todos');

    // a document instance
    //var book1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 });

    // save model to database
    router.get('/', function(req, res, next) {
        MatchData.find(function(err, todos) {
            if (err) return next(err);
            res.json(todos);
        });
    });
});

// var Product = require('../models/Products.js');
// var LoginData = require('../models/Login.js');
/* GET /todos listing. */
router.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});



// router.get('/', function (req, res, next) {

//   Todo.find(function (err, todos) {
//     if (err) return next(err);
//     res.json(todos);
//   });
// });

/* POST /todos */
// router.post('/', function (req, res, next) {
//   Todo.create(req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// Todo.create(req.body, function (err, post) {
//   if (err) return next(err);
//   res.json(post);
// });
// Product.create(req.body, function (err, post) {
//   if (err) return next(err);
//   res.json(post);
// });
// LoginData.create(req.body, function (err, post) {
//   if (err) return next(err);
//   res.json(post);
// });

//});

/* GET /todos/id */
// router.get('/:id', function (req, res, next) {
//   Todo.findById(req.params.id, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* PUT /todos/:id */
// router.put('/:id', function (req, res, next) {
//   Todo.findByIdAndUpdate(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

/* DELETE /todos/:id */
// router.delete('/:id', function (req, res, next) {
//   Todo.findByIdAndRemove(req.params.id, req.body, function (err, post) {
//     if (err) return next(err);
//     res.json(post);
//   });
// });

module.exports = router;