const postgreSQL = require("./index");

/**
 * Sanity Checks: DB Setup
 */
describe("Database Setup", () => {
	test("Connects to database successfully", async () => {
		let connected = false;
		try {
			await postgreSQL.client.connect();
			connected = true;
		} catch (e) {
			console.log("[CONNECTION FAILED]", e);
		}
		expect(connected).toBeTruthy();
	});
});

/**
 * Sanity Checks: CRUD Tests
 */
describe("Tests CRUD operations", () => {
	// test("Writes to database", async () => {
	// 	// will write
	// 	try {
	// 		await postgreSQL.insert("name", "test", "Nicolas K. Sartor");
	// 	} catch (e) {
	// 		console.log("[WRITING FAILED]", e);
	// 	}
	// 	// expect written file to be on database
	// });
	test("Reads from database", async () => {
		// will read
		try {
			await postgreSQL.read();
		} catch (e) {
			console.log("[READING FAILED]", e);
		}
		// expect to retrieve a file from database
	});
	test("Updates to database", async () => {
		// will update
		try {
			await postgreSQL.update();
		} catch (e) {
			console.log("[UPDATING FAILED]", e);
		}
		// expect to read an updated file from database
	});
	test("Deletes from database", async () => {
		// will delete
		try {
			await postgreSQL.del();
		} catch (e) {
			console.log("[DELETING FAILED]", e);
		}
		// expect created file to no longer be on database
	});
});
