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

/**
 * Saves array of 150 JSON objects into database
 */

const initDatabase = async () => {
	// connects
	await PostgreSQL.connect();

	/**
	 * Adds data to database, pg-format was giving errors, so I'm looping my own query format
	 */
	// clears data
	await clearBreweriesDB();

	// forms pg friendly (and sanitized!) values for query
	let data = await getExternalData();
	let valStr = "";
	for (let i = 0; i < data.length; i++) {
		if (i === data.length - 1 || data.length === 1) {
			valStr += `($${i + 1})`;
		} else {
			valStr += `($${i + 1}), `;
		}
	}

	return PostgreSQL.client
		.query(`insert into breweries(jsondata) values ${valStr}`, [...data])
		.then(() => {
			console.log("[DATABASE INITIALIZED WITH 150 ROWS]");
		})
		.catch(err => console.log("[ERROR SAVING TO DB]", err));
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

const retrieveAllBreweries = async () => {
	try {
		const res = await PostgreSQL.client.query(`select jsondata from breweries`);
		return res.rows;
	} catch (err) {
		console.log("[ERROR Fetching All From DB]", err);
	}
};

// SQL JSON Query builder
const selectJsonQuery = params => {
	const query = {
		text: "select jsondata from breweries ",
		values: ["Avondale Brewing Co"]
	};

	let whereStr = `where `;

	const keys = Object.keys(params);
	const vals = Object.values(params);

	for (let i = 0; i < keys.length; i++) {
		if (i === 0) {
			whereStr += `jsondata ->> '${keys[i]}' = $${i + 1}`;
		} else {
			whereStr += ` and jsondata ->> '${keys[i]}' = $${i + 1}`;
		}
	}

	query.text += whereStr;
	query.values = vals;

	return query;
};

const updateJsonQuery = params => {
	const query = {
		text: "update jsondata from breweries ",
		values: ["Avondale Brewing Co"]
	};

	let whereStr = `where `;

	const keys = Object.keys(params);
	const vals = Object.values(params);

	for (let i = 0; i < keys.length; i++) {
		if (i === 0) {
			whereStr += `jsondata ->> '${keys[i]}' = $${i + 1}`;
		} else {
			whereStr += ` and jsondata ->> '${keys[i]}' = $${i + 1}`;
		}
	}

	query.text += whereStr;
	query.values = vals;

	return query;
};

// regular SQL Query builder -- not used
const formParamQuery = params => {
	const query = {
		text: "select jsondata from breweries where",
		values: ["california"]
	};

	const keys = Object.keys(params);
	const vals = Object.values(params);
	let parameterStr = "";

	for (let i = 0; i < keys.length; i++) {
		parameterStr += ` ${keys[i]} = $${i + 1}`;
	}

	query.text += parameterStr;
	query.values = vals;

	return query;
};

const retrieveBreweriesWithParams = async params => {
	try {
		// Regular SQL query
		const query = formParamQuery(params);
		// JSON query
		const jsonQuery = selectJsonQuery(params);
		const res = await PostgreSQL.client.query(jsonQuery);
		return res.rows;
	} catch (err) {
		console.log("[ERROR Fetching From DB With Params]", err);
	}
};

const updateById = async (id, data) => {
	// Update
	try {
		const res = await PostgreSQL.client.query(`update breweries set jsondata = $1 where jsondata ->> 'id' = $2`, [data, id]);
		return res.rows;
	} catch (err) {
		console.log("[ERROR Updating To DB]", err);
	}
};

module.exports = {
	getExternalData,
	initDatabase,
	clearBreweriesDB,
	retrieveAllBreweries,
	retrieveBreweriesWithParams,
	updateById,
	formParamQuery,
	selectJsonQuery
};
