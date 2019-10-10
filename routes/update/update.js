const express = require("express");
const router = express.Router();
const app = express();
const baseDir = process.cwd();
const db = require(baseDir + "/services/db/index.js");

module.exports = app => {
	app.post("/breweries/:id", async (req, res) => {
		console.log(req.body);
		// get brewery
		const brewery = await db.retrieveBreweriesWithParams(req.params);
	});
};
