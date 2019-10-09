const { Client } = require("pg");

const client = new Client({
	connectionString: "postgres://vlxzcpmlnqtqpi:a9bde716908b9e7232bf6685d70aafffafa672a51ef908f9c1515c4aaf7d3717@ec2-174-129-227-146.compute-1.amazonaws.com:5432/d14941h8504b24",
	ssl: true
});

const connect = async () => {
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

module.exports = {
	connect
};
