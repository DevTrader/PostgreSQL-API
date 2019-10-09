const postgreSQL = require("./index");

describe("Database Setup", () => {
	test("Connects to database successfully", async () => {
		let connected = false;
		try {
			await postgreSQL.client.connect();
			client.end();
			connected = true;
		} catch (e) {
			console.log("[CONNECTION FAILED]", e);
		}
		expect(connected).toBeTruthy();
	});
});

/**
 * CRUD Tests
 */

describe("Tests CRUD operations", () => {
	test("Writes to database", async () => {
		// will write
	});
	test("Reads from database", async () => {
		// will read
	});
	test("Updates to database", async () => {
		// will update
	});
	test("Deletes from database", async () => {
		// will delete
	});
});
