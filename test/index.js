var express = require('express');
var blocks = require('blocks');
var fs = require('fs');
var path = require('path');
var webdriverio = require('webdriverio');
var appPath = '../app/';
var wdioConfig = path.join(__dirname, 'wdio.conf.js');

// Todo think about removing the emulation of the servers here
// Maybe spawning node processes with once the root app.js
// and one the blocks-static server is better.

var hasError = false;
console.log('Running tests client-side-rendering only');

startStaticServer()
	.then(runTests)
	.then(function (exitCode) {
		hasError = exitCode !== 0 ? true : hasError;
		console.log('Client side only tests complete.');
		console.log('Running tests with server-side rendering.');
	}).then(stopStaticServer)
	.then(startRenderedServer)
	.then(runTests)
	.then(function (exitCode) {
		hasError = exitCode !== 0 ? true : hasError;
		console.log('server side rendering complete.');
		process.exit(hasError ? 1 : 0);
	}).catch(function (e) {
		console.error(e);
		process.exit(1);
	});

var server;
function startStaticServer() {
	return new Promise(function (resolve, reject) {
		var app = express();
		app.use(express.static(appPath));
		// read content of the index.html for all other pages like /cart
		var content = fs.readFileSync(path.join(appPath, 'index.html'), {encoding: 'utf-8'});

		app.get('/*', function (req, res) {
			res.type('html').end(content);
		});
		app.on('error', reject);

		server = app.listen(8080, resolve);
	});
}

function stopStaticServer() {
	server.close();
}

function startRenderedServer() {
	return new Promise(function (resolve, reject) {
		// start a blocks-server instance
		var server = blocks.server({
			port: 8080,
			static: appPath,
			blocksPath: path.join(require.resolve('blocks'), './bocks.js')
		}).express();
		server.on('error', reject);
		// Let the blocks server do some async init stuff
		setTimeout(resolve, 10);
	});
}

function runTests() {
	return new webdriverio.Launcher(wdioConfig).run();
}


