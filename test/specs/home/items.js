describe('items', function () {
	beforeAll(function () {
		browser.url('/');
		browser.waitForReadyView('Home');
		browser.waitForExist('[data-query="each(products.view)"] > div');
		browser.pause(50);
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

		it('has the correct price $14', function () {
			expect(browser.element(selector + ' h2').getText()).toBe('$14');
		});

		it('has the correct description', function () {
			expect(browser.element(selector + ' p').getText()).toBe('Pants with a ribbon - Gray/Blue');
		});

		it('has a Add to Cart button', function () {
			expect(browser.element(selector + ' a.btn').getText()).toBe('Add to cart');
		});
	});

 	it('applies a categorie when clicked', function () {
		browser.element('#accordian .panel:nth-child(3) a').click();
		browser.pause(50);
		expect(browser.element('[data-query="each(products.view)"] div:first-child p').getText()).toBe('Official dress - Beige/Blue');
	});

	it('applies brands when clicked', function () {
		browser.element('[data-query="each(brands)"] .panel:nth-child(3) a').click();
		browser.pause(50);
		expect(browser.element('[data-query="each(products.view)"] div:first-child p').getText()).toBe('Casual dress - White/Cyclamen');
	});

	it('applies 2 filters correctly', function () {
		browser.element('[data-query="each(categories)"] .panel:last-child a').click();
		browser.element('[data-query="each(brands)"] .panel:last-child a').click();
		browser.pause(50);
		expect(browser.elements('[data-query="each(products.view) div"]').value.length).toBe(0);
	});

	it('applies the pagination correcty', function () {
		browser.url('/');
		browser.waitForExist('[data-query="each(products.view)"] div');
		browser.element('[data-query="each(pages)"] li:nth-child(4) a').click();
		browser.pause(50);
		expect(browser.element('[data-query="each(products.view)"] div:first-child p').getText()).toBe('Modern official dress');
	});
});