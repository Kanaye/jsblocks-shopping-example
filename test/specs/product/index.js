describe('product - detail', function () {
	browser.url('/product/1');
	browser.waitForReadyView('Product');

	it('has the correct headline', function () {
		expect(browser.element('.product-information h2').getText()).toBe('Pants with a ribbon - Gray/Blue');
	});

	it('has the correct price', function () {
		expect(browser.element('.product-information span span').getText()).toBe('US $14');
	});

	it('initialized with a selected quantity of 1', function () {
		expect(browser.element('.product-information input').getValue()).toBe('1');
	});

	it('has a button "add to cart"', function () {
		expect(browser.element('.product-information button').getText()).toBe('Add to cart');
	});

	it('has the correct brand', function () {
		expect(browser.element('.product-information > p:nth-child(5)').getText()).toBe('Brand: Lima');
	});
});