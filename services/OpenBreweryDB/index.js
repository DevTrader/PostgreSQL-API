const axios = require("axios");

const getBreweriesPerPage = page => {
	return axios
		.get(`https://api.openbrewerydb.org/breweries?page=${page}&per_page=50`)
		.then(res => {
			return res.data;
		})
		.catch(err => {
			console.log("[openbrewerydb.org cannot GET]", err);
		});
};

module.exports = {
	getBreweriesPerPage
};
