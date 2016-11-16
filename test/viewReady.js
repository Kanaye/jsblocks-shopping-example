// global viewReady function. Used on non index pages because onload doesn't mean that the tamplate is renderes (or downloaded)
module.exports = function viewReady(viewName) {
	var value = browser.execute(function (viewName) {
		var blocks = window.blocks;
		if (!blocks) return false;
		var App = blocks.Application();
		if (!App[viewName] || !App[viewName].isActive() || App[viewName].loading()) return false;
		return {success: true};
	}, viewName).value;
	return value;
};