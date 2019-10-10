const asyncLib = require("async");
const format = require("pg-format");

const baseDir = process.cwd();
const OpenBreweryDB = require(baseDir + "/services/OpenBreweryDB/index.js");
const PostgreSQL = require(baseDir + "/services/PostgreSQL/index.js");

/**
 * Gets 150 Breweries from OpenBreweryAPI and forms Array
 */
const getExternalData = async () => {
	const page1 = await OpenBreweryDB.getBreweriesPerPage(1);
	const page2 = await OpenBreweryDB.getBreweriesPerPage(2);
	const page3 = await OpenBreweryDB.getBreweriesPerPage(3);
	const dataArr = [...page1, ...page2, ...page3];
	return dataArr;
};

const createQuery = breweries => {
	let query = "insert into breweries(jsondata, state, type) values ";
	for (let i = 0; i < breweries.length; i++) {
		if (i == breweries.length - 1) {
			query += `(${JSON.stringify(breweries[i])}, ${breweries[i].state}, ${breweries[i].brewery_type})`;
		} else {
			query += `(${JSON.stringify(breweries[i])}, ${breweries[i].state}, ${breweries[i].brewery_type}), `;
		}
	}
	return query;
};

/**
 * Saves single brewery to self database
 */
const saveBreweryToDB = async breweryData => {
	try {
		await PostgreSQL.client.query(`insert into breweries(jsondata, state, type) values ($1, $2, $3)`, [breweryData, breweryData.state, breweryData.brewery_type]);
	} catch (err) {
		console.log("[ERROR SAVING TO DB]", err);
	}
};

/**
 * Loops Through Breweries and saves them
 */

const initDatabase = async () => {
	// connects
	await PostgreSQL.connect();
	// clears data
	await clearBreweriesDB();
	// fetches data
	let data = await getExternalData();

	// Forming the query gets erros
	// try {
	// 	await PostgreSQL.client.query(createQuery(data));
	// 	console.log("success");
	// } catch (err) {
	// 	console.log("err", err);
	// }

	/**
	 * Adds data to database, pg-format was giving errors when inserting 150 rows in a single query, so I'm looping
	 */
	return new Promise((resolve, reject) => {
		asyncLib.each(
			data,
			async brewery => {
				await saveBreweryToDB(brewery);
			},
			() => {
				console.log("[DATABASE INITIALIZED]");
				resolve();
			}
		);
	});
};

/**
 * Clears all data from database
 */
const clearBreweriesDB = async () => {
	try {
		await PostgreSQL.client.query(`truncate table breweries`);
	} catch (err) {
		console.log("[ERROR Clearing DB]", err);
	}
};

const retrieveAllBreweries = async () => {};

const retrieveBreweriesWithParams = async () => {};

const updateSingleBrewery = async () => {};

module.exports = {
	getExternalData,
	saveBreweryToDB,
	initDatabase,
	clearBreweriesDB,
	retrieveAllBreweries,
	retrieveBreweriesWithParams,
	updateSingleBrewery
};
