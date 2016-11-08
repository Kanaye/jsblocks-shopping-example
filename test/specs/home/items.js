describe('items', function () {
	beforeAll(function () {
		browser.url('/');
		browser.waitForExist('[data-query="each(products.view)"] div');
	});
	
	it('shows the first 9 items on load', function () {
		expect(browser.elements('[data-query="each(products.view)"] > div').value.length).toBe(9);
	});

	describe('first item', function () {
		var selector = '[data-query="each(products.view)"] div:first-child';
		it('has a link to the detail page (/product/1)', function () {
			expect(browser.element(selector + ' a').getAttribute('href')).toMatch(/\/product\/1$/);
		});

		it('has the correct img src', function () {
			expect(browser.element(selector + ' img').getAttribute('src')).toMatch(/\/images\/products\/1-small\.jpg$/);
		});



	});

});