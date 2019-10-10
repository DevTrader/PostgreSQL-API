const express = require("express");
const router = express.Router();
const app = express();
const baseDir = process.cwd();
const db = require(baseDir + "/services/db/index.js");

module.exports = app => {
	app.get("/breweries", async (req, res) => {
		const queryKeys = Object.keys(req.query);
		if (queryKeys.length === 0) {
			// If no queries, send all
			const breweries = await db.retrieveAllBreweries();
			res.send(breweries);
		} else {
			const breweries = await db.retrieveBreweriesWithParams(req.query);
			if (!breweries[0]) {
				res.status(404);
				return res.send(`No breweries match that query`);
			}
			res.send(breweries);
		}
	});
};
