const { Client } = require("pg");

// HEROKU POSTGRESQL URI
const client = new Client({
	connectionString: process.env.POSTGRESQL_URI,
	ssl: true
});

// WILL BECOME QUERY
const connect = () => {
	client
		.connect()
		.then(() => {
			console.log("[POSTGRESQL CONNECTED SUCCESSFULLY]");
		})
		.catch(err => {
			console.log("[POSTGRESQL CONNECTION FAILED]", err);
		})
		.finally(() => client.end());
};

// CREATE
const create = () => {};
// READ
const read = () => {};
// UPDATE
const update = () => {};
// DELETE
const del = () => {};

module.exports = {
	connect,
	client,
	create,
	read,
	update,
	del
};
