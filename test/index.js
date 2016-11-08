var express = require('express');
var blocks = require('blocks');
var fs = require('fs');
var path = require('path');
var webdriverio = require('webdriverio');
var appPath = path.join(__dirname, '../app/');


var wdio = new webdriverio.Launcher(path.join(__dirname, 'wdio.conf.js'));

console.log('Running client only tests');
runClientOnlyTests().then(function () {
	console.log('Client tests complete. Running tests with server-side rendering.');
	return runServerRenderingTests();
}).then(function () {
	console.log('server side rendering complete.');
	process.exit(0);
}).catch(function (e) {
	console.error(e);
	process.exit(1);
});

function runClientOnlyTests() {
	return new Promise(function (resolve, reject) {
		var app = express();
		app.use(express.static(appPath));
		var content = fs.readFileSync(path.join(appPath, 'index.html'));
		app.get('/*', function (req, res) {
			res.send(content);	
		});
		app.on('error', reject);
		var server = app.listen(8080, function () {
			runTests().then(function (exitCode) {
				server.close();
				resolve(exitCode);
			}, function (err) {
				server.close();
				reject(err);
			});
		});
	});
}

function runServerRenderingTests() {
	return new Promise(function (resolve, reject) {
		var server = blocks.server({
			port: 8080,
			static: appPath
		}).express();
		server.on('error', reject);
		runTests().then(function (exitCode) {
			resolve(exitCode);
		}, function (e) {
			reject(e);
		});
	});
}

function runTests() {
	return wdio.run();
}


