import test from 'ava';
import fn from '.';

test.cb('Full Run', t => {
	t.plan(8);

	const mainCbErr = t.throws(() => fn(), Error);
	t.is(mainCbErr.message, 'No callback was provided to handle the data (this operation is synchronous only in its current version).');

	fn(data => {
		t.is(Object.prototype.toString.call(data), '[object Object]');
		t.is(Object.prototype.toString.call(data.source), '[object String]');
		t.is(Object.prototype.toString.call(data.map), '[object String]');
		t.is(Object.prototype.toString.call(data.counties), '[object Array]');
		t.is(Object.prototype.toString.call(data.author), '[object String]');
		t.is(Object.prototype.toString.call(data.date), '[object Date]');

		t.end();
	});
});
