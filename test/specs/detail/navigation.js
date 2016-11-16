var productActive = viewReady.bind(null,'Product');

function showsProduct5 () {
		expect(browser.element('.product-information').isVisible()).toBe(true);
		expect(browser.element('.product-information h2').getText()).toBe('Pants with a ribbon - Aqua/Red');
}

describe('product - navigation', function () {
	it('is accessible via an direct url', function () {
		browser.url('/product/5');
		browser.waitUntil(productActive);
		showsProduct5();
	});

	it('hides the home view a detail page is opened', function () {
		browser.url('/product/5');
		browser.waitUntil(productActive);
		expect(browser.element('#home').isVisible()).toBe(false);
	});

	it('is accessible through clicking an item', function () {
		browser.url('/');
		browser.waitForExist('[data-query="each(products.view)"] div:first-child a');
		browser.element('[data-query="each(products.view)"] div:first-child a').click();
		browser.waitUntil(productActive);
		showsProduct5();
	});
});