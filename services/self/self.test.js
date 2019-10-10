const self = require("./index");

describe("Self database tests", () => {
	test("Retrieves 150 breweries", async () => {
		let data = await self.retrieveBreweryData();
		expect(data.length).toBe(150);
	});
	// test("Single brewery is saved to database", async () => {
	// 	let brewery = null;
	// 	expect(brewery).not.toBe(null);
	// });
	// test("Brewery database is initialized with 150 breweries", async () => {
	// 	let data = null;
	// 	expect(data.length).toBe(150);
	// });
	// test("Brewery database is cleared", async () => {
	// 	let data = null;
	// 	expect(data.length).toBe(0);
	// });
});
