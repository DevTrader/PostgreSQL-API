const self = require("./index");

const baseDir = process.cwd();
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");

describe("Self services tests", () => {
	let apiData, dbData;
	beforeAll(async () => {
		await PostgreSQL.connect();
	});
	test("Retrieves 150 breweries from external API", async () => {
		apiData = await self.getExternalData();
		expect(apiData.length).toBe(150);
	});
	test("Retrieves 150 breweries from DB", async () => {
		dbData = await self.retrieveAllBreweries();
		expect(dbData.length).toBe(150);
	});
	test("Forms param query", () => {
		const query = self.formParamQuery({ state: "california", type: "micro" });
		console.log(query);
		expect(query.text).toBe("select jsondata from breweries where state = $1 type = $2");
	});
	test("Retrieves California breweries from DB", async () => {
		const data = await self.retrieveBreweriesWithParams({ state: "california" });
		data.forEach(brewery => {
			expect(brewery.jsondata.state).toBe("California");
		});
	});
});
