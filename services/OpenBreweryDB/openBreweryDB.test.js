const openBreweryAPI = require("./index");

test("Retrieves Array of 50 breweries from Open Brewery API", async () => {
	const breweries = await openBreweryAPI.getBreweriesPerPage(1);
	expect(breweries.length).toEqual(50);
	expect(breweries[0]).toHaveProperty("id");
});
