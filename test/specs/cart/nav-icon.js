describe('nav-icon', function () {
	it ('updates the nav-icon counter from the home view', function () {
		browser.url('/');
		browser.waitForReadyView('Home');
		browser.click('[data-query="each(products.view)"] .col-sm-4:nth-child(1) a.add-to-cart');
		browser.click('[data-query="each(products.view)"] .col-sm-4:nth-child(2) a.add-to-cart');
		browser.click('[data-query="each(products.view)"] .col-sm-4:nth-child(3) a.add-to-cart');
		browser.click('[data-query="each(products.view)"] .col-sm-4:nth-child(4) a.add-to-cart');
		browser.pause(200);
		expect(browser.element('#cart-link span').getText()).toBe('4');
	});

	it('updates the nav-icon from a product view', function () {
		browser.url('about:blank');
		browser.pause(10);
		browser.url('/product/1');
		browser.waitForReadyView('Product');
		expect(browser.element('.cart-link span').isVisible()).toBe(false);
		browser.click('.product-information button.cart');
		browser.pause(200);
		expect(browser.element('#cart-link span').getText()).toBe('1');
	});

	it('navigates to the cart on click', function () {
		browser.click('#cart-link');
		browser.pause(100);
		expect(browser.getUrl()).toMatch(/\/cart$/);
	});
});