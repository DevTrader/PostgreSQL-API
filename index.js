const express = require("express");
const createError = require("http-errors");

const app = express();
const PORT = process.env.PORT || "3000";

app.set("port", PORT);
app.listen(PORT, () => console.log(`[Server listening on port ${PORT}]`));

//Route Loader
require("./routes")(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
	next(createError(404));
});
