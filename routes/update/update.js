const express = require("express");
const router = express.Router();
const app = express();
const baseDir = process.cwd();
const db = require(baseDir + "/services/db/index.js");

module.exports = app => {
	app.post("/breweries/:id", async (req, res) => {
		// get brewery
		let brewery = await db.retrieveBreweriesWithParams(req.params);
		brewery = brewery[0].jsondata;
		if (req.body.brewery_type) {
			req.body.brewery_type = req.body.brewery_type.toLowerCase();
		}
		brewery = { ...brewery, ...req.body };
		await db.updateById(req.params.id, brewery);
		const updated = await db.retrieveBreweriesWithParams(req.params);

		res.send(updated);
	});
};
