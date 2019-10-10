const express = require("express");
const router = express.Router();
const app = express();
const baseDir = process.cwd();
const db = require(baseDir + "/services/db/index.js");

module.exports = app => {
	app.post("/breweries/:id", async (req, res) => {
		// get brewery
		let brewery = await db.retrieveBreweriesWithParams(req.params);
		if (!brewery[0]) {
			res.status(404);
			return res.send(`Brewery with ${id} not found`);
		}
		brewery = brewery[0].jsondata;
		// form updated
		brewery = { ...brewery, ...req.body };

		await db.updateById(req.params.id, brewery);
		// retrieve updated
		const updated = await db.retrieveBreweriesWithParams(req.params);

		return res.send(updated);
	});
};
