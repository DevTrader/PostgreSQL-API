const express = require("express");
const createError = require("http-errors");

const baseDir = process.cwd();
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || "3000";

PostgreSQL.connect();

app.set("port", PORT);
app.listen(PORT, () => {
	console.log(`[Server listening on port ${PORT}]`);
});

//Route Loader
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});
