'use strict';
const request = require('request');

const ENDPOINT = 'http://tfsfrp.tamu.edu/wildfires/BurnBan.xml';

const retrieveData = _successFn => {
	if (!_successFn) {
		throw new Error('No callback was provided to handle the data.');
	}

	const requestOptions = {method: 'GET', uri: ENDPOINT, encoding: 'utf16le'};
	request(requestOptions, (error, response, body) => {
		if (error) {
			throw new Error(error);
		}

		_successFn(body);
	});
};

module.exports = _successFn => retrieveData(_successFn);
