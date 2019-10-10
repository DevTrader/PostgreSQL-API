const { Client } = require("pg");

// HEROKU POSTGRESQL URI
const client = new Client({
	connectionString: process.env.DATABASE_URL || process.env.POSTGRESQL_URI,
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

module.exports = {
	connect,
	client
};
