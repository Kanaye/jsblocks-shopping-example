describe('detail - navigation', function () {
	it('is accessible via an direct url', function () {
		browser.url('/product/5');
		browser.waitForText('.product-information h2');
		expect(browser.element('.product-information').isVisible()).toBe(true);
		expect(browser.element('.product-information h2').getText()).toBe('Pants with a ribbon - Aqua/Red');
	});

	it('hides the home view a detail page is opened', function () {
		browser.url('/product/5');
		browser.waitForExist('.product-information h2');
		expect(browser.element('#home').isVisible()).toBe(false);
	});

	it('is accessible through clicking an item', function () {
		browser.url('/');
		browser.waitForExist('[data-query="each(products.view)"] h2');
		browser.element('[data-query="each(products.view)"] div:first-child a').click();
		expect(browser.element('.product-information').isVisible()).toBe(true);
		expect(browser.element('.product-information h2').getText()).toBe('Pants with a ribbon - Gray/Blue');
	});
});