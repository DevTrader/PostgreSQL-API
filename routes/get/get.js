const express = require("express");
const router = express.Router();
const app = express();
const baseDir = process.cwd();
const db = require(baseDir + "/services/db/index.js");

module.exports = app => {
	app.get("/breweries", async (req, res) => {
		const queryKeys = Object.keys(req.query);
		const queryParams = {};
		if (queryKeys.length === 0) {
			// If no queries, send all
			const breweries = await db.retrieveAllBreweries();
			res.send(breweries);
		} else {
			// If queries, normalize data and search with params
			for (let i = 0; i < queryKeys.length; i++) {
				let value = req.query[queryKeys[i]];
				if (typeof value === "string" && queryKeys[i] !== "brewery_type") {
					value = value
						.trim()
						.replace(/ {1,}/g, " ")
						.toLowerCase()
						.split(" ")
						.map(word => word[0].toUpperCase() + word.slice(1))
						.join(" ");
					queryParams[queryKeys[i]] = value;
				} else {
					queryParams[queryKeys[i]] = req.query[queryKeys[i]];
				}
			}
			const breweries = await db.retrieveBreweriesWithParams(queryParams);
			res.send(breweries);
		}
	});
};
