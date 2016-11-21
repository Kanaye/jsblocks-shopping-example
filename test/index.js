var childProcess = require('child_process');
var path = require('path');
var webdriverio = require('webdriverio');
var wdioConfig = path.join(__dirname, 'wdio.conf.js');


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
		console.log('server side rendering  tests complete.');
	}).then(stopRenderedServer)
	.then(function () {
		process.exit(hasError ? 1 : 0);
	})
	.catch(function (e) {
		console.error(e);
		process.exit(1);
	});

function runTests() {
	return new webdriverio.Launcher(wdioConfig).run();
}
var staticServer = null;
function stopStaticServer() {
	return new Promise(function (res, rej) {
		if (staticServer) {
			staticServer.kill();
			staticServer = null;
			return res();
		}
		rej(new Error('no static server running'));
	});
}
function startStaticServer() {
	return spawnServerProcess('node', ['./node_modules/blocks-cli/bin/blocks.js', 'static'], '../').then(function (server) {
		return (staticServer = server);
	});
}
var  renderedServer = null;
function stopRenderedServer () {
	return new Promise(function (res, rej) {
		if (renderedServer) {
			renderedServer.kill();
			renderedServer = null;
			return res();
		}
		rej(new Error('No rendered server running.'));
	});
}
function startRenderedServer () {
	return spawnServerProcess('node', ['./app.js'], '../').then(function (server) {
		return (renderedServer = server);
	});
}

function spawnServerProcess(command, args, cwd) {
	return new Promise(function (resolve, reject) {
		resolve(childProcess.spawn(command, args, {cwd: cwd}));
	});
}