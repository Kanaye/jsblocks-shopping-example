var express = require('express');
var blocks = require('blocks');
var fs = require('fs');
var path = require('path');
var webdriverio = require('webdriverio');
var appPath = path.join(__dirname, '../app/');
var wdioConfig = path.join(__dirname, 'wdio.conf.js');

var hasError = false;
console.log('Running tests client-side-rendering only');
runClientOnlyTests().then(function (exitCode) {
	hasError = exitCode !== 0 ? true : hasError;
	console.log('Client tests complete. Running tests with server-side rendering.');
	return runServerRenderingTests();
}).then(function (exitCode) {
	hasError = exitCode !== 0 ? true : hasError;
	console.log('server side rendering complete.');
	process.exit(hasError ? 1 : 0);
}).catch(function (e) {
	console.error(e);
	process.exit(1);
});

function runClientOnlyTests() {
	return new Promise(function (resolve, reject) {
		var app = express();
		app.use(express.static(appPath));
		var content = fs.readFileSync(path.join(appPath, 'index.html'), {encoding: 'utf-8'});
		app.get('/*', function (req, res) {
			res.type('html').end(content);
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
	return new webdriverio.Launcher(wdioConfig).run();
}


