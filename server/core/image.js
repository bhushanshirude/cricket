var express = require('express');
var router = express.Router();
var randomstring = require("randomstring");
var mongoose = require('mongoose');
var multer = require('multer');
var upload = multer({
	dest: 'uploads/'
})
router.post('/upload', upload.any(), function (req, res, next) {
	res.send(req.files);
	//res.send(req.body.name);
	//	res.send();

})

module.exports = router;