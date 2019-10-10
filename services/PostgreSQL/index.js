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

// insert
const insert = async (keys, collection, data) => {
	try {
		await client.query(`insert into ${collection}(${keys}) values ($1)`, [data]);
	} catch (err) {
		console.log("[Error Querying Database]", err);
	}
};

const query = async query => {
	try {
		await client.query(query);
	} catch (err) {
		console.log("[Error Querying Database]", err);
	}
};

module.exports = {
	connect,
	client,
	query
};
