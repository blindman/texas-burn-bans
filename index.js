'use strict';
const http = require('http');

const HOSTNAME = 'tfsfrp.tamu.edu';
const PATH = '/WILDFIRES/BURNBAN.txt';

module.exports = _successFn => {
	if (!_successFn) {
		throw new Error('No callback was provided to handle the data (this operation is synchronous only in its current version).');
	}

	http.get({hostname: HOSTNAME, path: PATH}, response => {
		const data = {
			source: 'http://' + HOSTNAME + PATH,
			title: null,
			map: 'http://tfsfrp.tamu.edu/wildfires/DecBan.png',
			counties: [],
			author: 'burnban@tfs.tamu.edu',
			date: null
		};

		response.setEncoding('utf16le');

		response.on('end', () => _successFn(data));

		response.on('data', _chunk => {
			const chunkArray = _chunk.trim().split('\r\n');
			if (data.title === null) {
				const head = chunkArray.shift().split(' - ');
				data.title = head[0];
				data.date = new Date(head[1]);
			}
			data.counties.push.apply(data.counties, chunkArray);
		});
	}).on('error', error => {
		throw new Error(error);
	});
};
