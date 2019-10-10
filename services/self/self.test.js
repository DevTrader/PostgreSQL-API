const self = require("./index");

const baseDir = process.cwd();
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");

describe("Self services tests", () => {
	let apiData, dbData;
	test("Retrieves 150 breweries from external API", async () => {
		apiData = await self.getExternalData();
		expect(apiData.length).toBe(150);
	});
	test("Retrieves 150 breweries from DB", async () => {
		await PostgreSQL.connect();
		dbData = await self.retrieveAllBreweries();
		await PostgreSQL.client.end();
		expect(dbData.length).toBe(150);
	});
});
