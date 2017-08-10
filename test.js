import test from 'ava';
import fn from '.';

const testXml = `<?xml version='1.0' encoding='utf-16'?> <rss version='2.0' xmlns:atom='http://www.w3.org/2005/Atom'><channel><atom:link href='http://tfsfrp.tamu.edu/wildfires/burnban.xml' rel='self' type='application/rss+xml' /><title>
Texas Burn Bans</title><link>http://tfsweb.tamu.edu/main/default.aspx?dept=frp</link><description>Texas Burn Bans</description><item><title>
91 Texas Burn Bans - 8/8/2017 12:27:44 PM</title><link>http://tfsfrp.tamu.edu/wildfires/DecBan.png</link><description>
ARMSTRONG, ATASCOSA, BAILEY, BANDERA, BASTROP, BAYLOR, BELL, BEXAR, BLANCO, BREWSTER, BROOKS, BROWN, CALDWELL, CALLAHAN, CARSON, CASTRO, CHILDRESS, COCHRAN, COKE, COLEMAN, COLORADO, COMAL, CONCHO, CRANE, CROCKETT, CROSBY, CULBERSON, DEWITT, DICKENS, DIMMIT, DUVAL, EASTLAND, EL PASO, FAYETTE, FRIO, GARZA, GILLESPIE, GLASSCOCK, GUADALUPE, HAYS, HUDSPETH, HUTCHINSON, JEFF DAVIS, JIM HOGG, JOHNSON, KENDALL, KERR, KINNEY, KLEBERG, LAMB, LAMPASAS, LEE, LIMESTONE, LLANO, MARTIN, MASON, MCCULLOCH, MCLENNAN, MEDINA, MENARD, MILLS, MOORE, MOTLEY, NOLAN, PECOS, POTTER, PRESIDIO, REAGAN, REAL, ROBERTSON, SCHLEICHER, STARR, STEPHENS, SUTTON, TAYLOR, TERRELL, THROCKMORTON, TOM GREEN, TRAVIS, UPTON, UVALDE, VAL VERDE, WALLER, WARD, WHEELER, WILLACY, WILLIAMSON, WILSON, WINKLER, YOAKUM, ZAPATA
</description><atom:email>burnban@tfs.tamu.edu</atom:email><author>burnban@tfs.tamu.edu</author><guid>
080817122744
</guid></item></channel></rss>`;

// eslint-disable-next-line comma-spacing, quotes, quote-props, key-spacing
const testJson = {"rss":{"$":{"version":"2.0","xmlns:atom":"http://www.w3.org/2005/Atom"},"channel":[{"atom:link":[{"$":{"href":"http://tfsfrp.tamu.edu/wildfires/burnban.xml","rel":"self","type":"application/rss+xml"}}],"title":["Texas Burn Bans"],"link":["http://tfsweb.tamu.edu/main/default.aspx?dept=frp"],"description":["Texas Burn Bans"],"item":[{"title":["91 Texas Burn Bans - 8/8/2017 12:27:44 PM"],"link":["http://tfsfrp.tamu.edu/wildfires/DecBan.png"],"description":["ARMSTRONG, ATASCOSA, BAILEY, BANDERA, BASTROP, BAYLOR, BELL, BEXAR, BLANCO, BREWSTER, BROOKS, BROWN, CALDWELL, CALLAHAN, CARSON, CASTRO, CHILDRESS, COCHRAN, COKE, COLEMAN, COLORADO, COMAL, CONCHO, CRANE, CROCKETT, CROSBY, CULBERSON, DEWITT, DICKENS, DIMMIT, DUVAL, EASTLAND, EL PASO, FAYETTE, FRIO, GARZA, GILLESPIE, GLASSCOCK, GUADALUPE, HAYS, HUDSPETH, HUTCHINSON, JEFF DAVIS, JIM HOGG, JOHNSON, KENDALL, KERR, KINNEY, KLEBERG, LAMB, LAMPASAS, LEE, LIMESTONE, LLANO, MARTIN, MASON, MCCULLOCH, MCLENNAN, MEDINA, MENARD, MILLS, MOORE, MOTLEY, NOLAN, PECOS, POTTER, PRESIDIO, REAGAN, REAL, ROBERTSON, SCHLEICHER, STARR, STEPHENS, SUTTON, TAYLOR, TERRELL, THROCKMORTON, TOM GREEN, TRAVIS, UPTON, UVALDE, VAL VERDE, WALLER, WARD, WHEELER, WILLACY, WILLIAMSON, WILSON, WINKLER, YOAKUM, ZAPATA"],"atom:email":["burnban@tfs.tamu.edu"],"author":["burnban@tfs.tamu.edu"],"guid":["080817122744"]}]}]}};

test.cb('Data Retrieval', t => {
	t.plan(3);

	const retrieveData = fn(true).retrieveData;

	const retrievalCbErr = t.throws(() => retrieveData(), Error);
	t.is(retrievalCbErr.message, 'No callback was provided to handle the data.');

	retrieveData(data => {
		t.is(Object.prototype.toString.call(data), '[object String]');

		t.end();
	});
});

test.cb('XML Conversion', t => {
	t.plan(5);

	const convertXmlToJson = fn(true).convertXmlToJson;

	const missingXmlErr = t.throws(() => convertXmlToJson(), Error);
	t.is(missingXmlErr.message, 'No XML was provided.');

	const xmlConversionCbErr = t.throws(() => convertXmlToJson('test'), Error);
	t.is(xmlConversionCbErr.message, 'No callback was provided to handle the data.');

	convertXmlToJson(testXml, data => {
		t.is(Object.prototype.toString.call(data), '[object Object]');

		t.end();
	});
});

test.cb('JSON Formatting', t => {
	t.plan(5);

	const formatJson = fn(true).formatJson;

	const missingJsonError = t.throws(() => formatJson(), Error);
	t.is(missingJsonError.message, 'No JSON was provided.');

	const jsonFormatCbErr = t.throws(() => formatJson({}), Error);
	t.is(jsonFormatCbErr.message, 'No callback was provided to handle the data.');

	formatJson(testJson, data => {
		t.is(Object.prototype.toString.call(data), '[object Object]');

		t.end();
	});
});

test.cb('Full Run', t => {
	t.plan(17);

	const mainCbErr = t.throws(() => fn(), Error);
	t.is(mainCbErr.message, 'No callback was provided to handle the data (this operation is synchronous only in its current version).');

	fn(data => {
		t.is(Object.prototype.toString.call(data), '[object Object]');
		t.is(Object.prototype.toString.call(data.source), '[object String]');
		t.is(Object.prototype.toString.call(data.info), '[object String]');
		t.is(Object.prototype.toString.call(data.map), '[object String]');
		t.is(Object.prototype.toString.call(data.counties), '[object Array]');
		t.is(Object.prototype.toString.call(data.author), '[object String]');
		t.is(Object.prototype.toString.call(data.date), '[object Date]');

		t.is(Object.prototype.toString.call(data._meta), '[object Object]');

		t.is(Object.prototype.toString.call(data._meta.rss), '[object Object]');
		t.is(Object.prototype.toString.call(data._meta.rss.namespace), '[object String]');
		t.is(Object.prototype.toString.call(data._meta.rss.version), '[object String]');

		t.is(Object.prototype.toString.call(data._meta.channel), '[object Object]');
		t.is(Object.prototype.toString.call(data._meta.channel.href), '[object String]');
		t.is(Object.prototype.toString.call(data._meta.channel.rel), '[object String]');
		t.is(Object.prototype.toString.call(data._meta.channel.type), '[object String]');

		t.end();
	});
});
