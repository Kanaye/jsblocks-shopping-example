// viewReady function. Used on non index pages because onload doesn't mean that the tamplate is renderes (or downloaded)

// will be called on the client side
function clientsideViewInitialized(viewName) {
  var blocks = window.blocks;
  if (!blocks) return false;
  var App = blocks.Application();
  if (!App[viewName] || !App[viewName].isActive() || App[viewName].loading()) {
  	return false;
  }
  return true;
}

module.exports = function viewReady(viewName) {
  var clientReady = browser.execute.bind(browser, clientsideViewInitialized, viewName);
  browser.waitForVisible('[data-query="view(' + viewName + ')"]');
  browser.waitUntil(clientReady);
};
