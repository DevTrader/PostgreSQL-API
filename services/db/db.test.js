const db = require("./index");

const baseDir = process.cwd();
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");

describe("Self services tests", () => {
	//Setup and tear-down
	let apiData, dbData;
	beforeAll(async () => {
		await PostgreSQL.connect();
	});
	afterAll(async () => {
		await PostgreSQL.client.end();
	});

	test("Retrieves 150 breweries from external API", async () => {
		apiData = await db.getExternalData();
		expect(apiData.length).toBe(150);
	});
	test("Retrieves 150 breweries from DB", async () => {
		dbData = await db.retrieveAllBreweries();
		expect(dbData.length).toBe(150);
	});
	test("Forms param SQL query", () => {
		const query = db.formParamQuery({ state: "california", type: "micro" });
		expect(query.text).toBe("select jsondata from breweries where state = $1 type = $2");
	});
	test("Forms param json query", () => {
		const query = db.selectJsonQuery({ state: "California", city: "San Rafael" });
		expect(query.text).toBe("select jsondata from breweries where jsondata ->> 'state' = $1 and jsondata ->> 'city' = $2");
	});
	test("Retrieves California breweries from DB by JSON", async () => {
		const data = await db.retrieveBreweriesWithParams({ state: "California" });
		data.forEach(brewery => {
			expect(brewery.jsondata.state).toBe("California");
		});
	});
	test("Retrieves San Rafael breweries from DB by JSON", async () => {
		const data = await db.retrieveBreweriesWithParams({ state: "California", city: "San Rafael" });
		data.forEach(brewery => {
			expect(brewery.jsondata.city).toBe("San Rafael");
		});
	});
	test("Update single brewery to DB", async () => {
		dbData = await db.retrieveAllBreweries();

		const breweryToUpdate = { ...dbData[0].jsondata };
		breweryToUpdate.name = "Nick's hoppy brewery";

		await db.updateById(breweryToUpdate.id, breweryToUpdate);
		const updated = await db.retrieveBreweriesWithParams({ id: breweryToUpdate.id });

		expect(updated[0].jsondata.name).toBe("Nick's hoppy brewery");
	});
});
