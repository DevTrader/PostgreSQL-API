const load = app => {
	// data validation
	app.use("/breweries/:id", (req, res, next) => {
		const acceptedKeys = [
			"id",
			"name",
			"brewery_type",
			"street",
			"city",
			"state",
			"postal_code",
			"country",
			"longitude",
			"latitude",
			"phone",
			"website_url",
			"updated_at",
			"tag_list"
		];
		const bodyKeys = Object.keys(req.body);
		const body = {};
		if (bodyKeys.length === 0) {
			return res.send([]);
		} else {
			// If params, normalize data
			for (let i = 0; i < bodyKeys.length; i++) {
				let value = req.body[bodyKeys[i]];
				// If user tries to add keys to JSON
				if (!acceptedKeys.includes(bodyKeys[i])) {
					res.status(403);
					return res.send("Forbidden Request Body");
				}
				// If user tries to add keys to JSON
				if (typeof value === "string" && value.length > 50) {
					res.status(403);
					return res.send(`Forbidden ${bodyKeys[i]} length, max char limit = 50`);
				}

				if (typeof value === "string" && bodyKeys[i] !== "brewery_type") {
					value = value
						.trim()
						.replace(/ {1,}/g, " ")
						.toLowerCase()
						.split(" ")
						.map(word => word[0].toUpperCase() + word.slice(1))
						.join(" ");
					body[bodyKeys[i]] = value;
				} else if (bodyKeys[i] === "brewery_type") {
					body[bodyKeys[i]] = req.body.brewery_type.toLowerCase();
				} else {
					body[bodyKeys[i]] = req.body[bodyKeys[i]];
				}
			}
		}
		req.body = body;
		next();
	});

	app.use("/breweries", (req, res, next) => {
		const queryKeys = Object.keys(req.query);
		const queryParams = {};
		// If queries, normalize data and search with params
		if (queryKeys.length > 0) {
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
				} else if (queryKeys[i] === "brewery_type") {
					queryParams[queryKeys[i]] = req.query.brewery_type.toLowerCase();
				} else {
					queryParams[queryKeys[i]] = req.query[queryKeys[i]];
				}
			}
			req.query = queryParams;
		}
		next();
	});
};

module.exports = { load };
