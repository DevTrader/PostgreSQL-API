const { Client } = require("pg");

// HEROKU POSTGRESQL URI
const client = new Client({
	connectionString: process.env.POSTGRESQL_URI,
	ssl: true
});

const connect = async () => {
	try {
		await client.connect();
		console.log("[POSTGRESQL CONNECTED SUCCESSFULLY]");
	} catch (err) {
		console.log("[POSTGRESQL FAILED]", err);
	}
};

// CREATE
const create = async data => {
	try {
	} catch (err) {}
};

// READ
const read = async () => {
	try {
	} catch (err) {}
};

// UPDATE
const update = async () => {
	try {
	} catch (err) {}
};

// DELETE
const del = async () => {
	try {
	} catch (err) {}
};

module.exports = {
	connect,
	client,
	create,
	read,
	update,
	del
};
