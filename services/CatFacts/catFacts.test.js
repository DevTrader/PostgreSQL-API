const catFacts = require("./index");

test("retrieves from catfacts API", async () => {
	const facts = await catFacts.getFacts();
	expect(facts.length).toBeGreaterThan(0);
});
