const axios = require("axios");

const getFacts = () => {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			resolve([1, 2]);
		}, 3000);
	});
};

module.exports = {
	getFacts: getFacts
};
