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
		console.log("[Error Inserting To Database]", err);
	}
};

// READ
const read = async () => {
	try {
		const data = await client.query(`select * from test`);
		console.log(data.rows);
	} catch (err) {
		console.log("[Error Selecting From Database]", err);
	}
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
	insert,
	read,
	update,
	del
};
