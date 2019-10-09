var express = require("express");
var router = express.Router();
var app = express();

module.exports = app => {
	app.get("/catfacts", async (req, res) => {
		res.send({ catfacts: [1, 2, 3] });
	});
};
