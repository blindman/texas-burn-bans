# texas-burn-bans [![Build Status](https://travis-ci.org/blindman/texas-burn-bans.svg?branch=master)](https://travis-ci.org/blindman/texas-burn-bans) [![codecov](https://codecov.io/gh/blindman/texas-burn-bans/badge.svg?branch=master)](https://codecov.io/gh/blindman/texas-burn-bans?branch=master)

> Retrieve burn ban information for Texas


## Install

```
$ npm install texas-burn-bans
```


## Attributes

```json
{
	"source": "String (URL Endpoint)",
	"title": "String",
	"info": "String (URL Endpoint)",
	"map": "String (URL Endpoint)",
	"counties": "Array[String]",
	"author": "String (Email Address)",
	"date": "Date (ISO Format)"
}
```


## Usage

```js
const texasBurnBans = require('texas-burn-bans');

texasBurnBans(data => {
	console.log('Source XML: %s', data.source);
	console.log('Title: %s', data.title);
	console.log('More info: %s', data.info);
	console.log('Map of Burn Bans: %s', data.map);
	console.log('Number of Burn Bans: %d', data.counties.length);
	console.log('Counties with a Burn Ban: %s', data.counties.join(', '));
	console.log('Author: %s', data.author);
	console.log('Updated on: %s', Date(data.date));
});
```


## License

MIT © [blindman](https://github.com/blindman)
