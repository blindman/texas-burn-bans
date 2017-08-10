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

const formatJson = (_json, _successFn) => {
	if (!_json) {
		throw new Error('No JSON was provided.');
	}

	if (!_successFn) {
		throw new Error('No callback was provided to handle the data.');
	}

	_successFn({
		source: ENDPOINT,
		title: _json.rss.channel[0].title[0],
		info: _json.rss.channel[0].link[0],
		map: _json.rss.channel[0].item[0].link[0],
		counties: _json.rss.channel[0].item[0].description[0].split(', '),
		author: _json.rss.channel[0].item[0].author[0],
		date: new Date(_json.rss.channel[0].item[0].title[0].split(' - ')[1].trim()),
		_meta: {
			rss: {
				namespace: _json.rss.$['xmlns:atom'],
				version: _json.rss.$.version
			},
			channel: {
				href: _json.rss.channel[0]['atom:link'][0].$.href,
				rel: _json.rss.channel[0]['atom:link'][0].$.rel,
				type: _json.rss.channel[0]['atom:link'][0].$.type
			}
		}
	});
};

module.exports = _successFn => {
	if (typeof _successFn === 'boolean' && _successFn === true) {
		return {
			retrieveData,
			convertXmlToJson,
			formatJson
		};
	}

	if (!_successFn) {
		throw new Error('No callback was provided to handle the data (this operation is synchronous only in its current version).');
	}
	retrieveData(xmlData => {
		convertXmlToJson(xmlData, jsonData => {
			formatJson(jsonData, _successFn);
		});
	});
};
