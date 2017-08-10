'use strict';
const request = require('request');
const parser = require('xml2js');

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

const convertXmlToJson = (_xml, _successFn) => {
	if (!_xml) {
		throw new Error('No XML was provided.');
	}

	if (!_successFn) {
		throw new Error('No callback was provided to handle the data.');
	}

	parser.parseString(_xml, {trim: true}, (error, result) => {
		if (error) {
			throw new Error(error);
		}

		_successFn(result);
	});
};

module.exports = _successFn => {
	retrieveData(xmlData => {
		convertXmlToJson(xmlData, _successFn);
	});
};
