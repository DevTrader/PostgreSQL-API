const asyncLib = require("async");

const baseDir = process.cwd();
const OpenBreweryDB = require(baseDir + "/services/OpenBreweryDB/index.js");

const retrieveBreweryData = async () => {
	const page1 = await OpenBreweryDB.getBreweriesPerPage(1);
	const page2 = await OpenBreweryDB.getBreweriesPerPage(2);
	const page3 = await OpenBreweryDB.getBreweriesPerPage(3);
	const dataArr = [...page1, ...page2, ...page3];
	return dataArr;
};

const saveBreweryToDatabase = async () => {};

const asyncLoopBreweries = async () => {};

const initializeBreweriesDatabase = async () => {};

const clearBreweriesDatabase = async () => {};

module.exports = {
	retrieveBreweryData
};
