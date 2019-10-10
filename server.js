const express = require("express");
const createError = require("http-errors");

const baseDir = process.cwd();
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");
const db = require(baseDir + "/services/db/index.js");

const app = express();
const PORT = process.env.PORT || "3000";

app.set("port", PORT);
app.listen(PORT, () => {
	console.log(`[Server listening on port ${PORT}]`);
});

// Initializes database
db.initDatabase();

// Middleware
app.use(express.json());

app.use(function(req, res, next) {
	res.setHeader("content-type", "application/json");
	next();
});

//Route Loader
require("./routes")(app);

app.get("*", (req, res) => {
	res.status(404);
	res.send("Not Found");
});
