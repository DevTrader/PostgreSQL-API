const self = require("./index");

const baseDir = process.cwd();
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");

describe("Self database tests", () => {
	let apiData;
	test("Retrieves 150 breweries from external API", async () => {
		apiData = await self.getExternalData();
		expect(apiData.length).toBe(150);
	});
	// test("Initializes database", async () => {
	// 	let data;
	// 	try {
	// 		await self.initDatabase();
	// 		await PostgreSQL.connect();
	// 		data = await PostgreSQL.client.query("select * from breweries");
	// 		await PostgreSQL.client.close();
	// 	} catch (err) {
	// 		console.log("[ERROR INITIALIZING DB]", err);
	// 	}
	// 	expect(data.rows.length).toBe(150);
	// }, 30000);
});
