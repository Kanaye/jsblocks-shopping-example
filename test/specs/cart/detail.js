function reset () {
	browser.url('about:blank');
	browser.pause(20);
	browser.url('/');
	browser.waitForReadyView('Home');
}

function navigateToHome() {
	browser.click('#header .logo a');
}

function addProduct(index) {
	browser.element('[data-query="each(products.view)"] .col-sm-4:nth-child(' + index + ') .btn.add-to-cart').click();
	browser.pause(20);
	browser.click('#cart-link a');
	browser.pause(100);
	browser.waitForReadyView('Cart');
}

describe('cart - detail', function () {
	// generell cart stuff on init
	it('starts with an "No items" message on direct load', function () {
		browser.url('/cart');
		browser.waitForReadyView('Cart');
		expect(browser.element('.empty-cart').isVisible()).toBe(true);
		expect(browser.element('.empty-cart h4').getText()).toEqual('No items in the cart. Let\'s go shopping.');
	});

	it('hides the checkout section on load #do_action', function () {
		browser.url('/cart');
		browser.waitForReadyView('Cart');
		expect(browser.element('#do_action').isVisible()).toBe(false);
	});

	it('hides the "No items message" when a product was added', function () {
		reset();
		addProduct(1);
		expect(browser.element('.empty-cart').isVisible()).toBe(false);
	});

	it('show the checkout section when a product was added', function () {
		reset();
		addProduct(1);
		expect(browser.element('#do_action').isVisible()).toBe(true);
	});
	it('removes an item when clicking the remove button', function () {
		reset();
		addProduct(1);

		browser.click('.cart_delete span');
		browser.pause(20);

		expect(browser.elements('[data-query="each(products)"] tr').value.length).toBe(0);
	});

	it('show the "no items" message when removing the last product', function () {
		reset();
		addProduct(1);

		browser.click('.cart_delete span');
		browser.pause(20);

		expect(browser.element('.empty-cart').isVisible()).toBe(true);
	});

	it('hides the checkout section when removing the last product', function () {
		reset();
		addProduct(1);

		browser.click('.cart_delete span');

		expect(browser.element('#do_action').isVisible()).toBe(false);
	});
	describe('product (product 1)' ,function () {
		beforeEach(function () {
			// Just make sure the page is in a clean state
			reset();
			addProduct(1);
		});

		it('shows the img of first item', function () {
			expect(browser.element('.cart_product img').getAttribute('src')).toMatch(/1-small\.jpg$/);
		});

		it('shows the product title', function () {
			expect(browser.element('.cart_description h4').getText()).toEqual('Pants with a ribbon - Gray/Blue');
		});

		it('shows the correct product price', function () {
			expect(browser.element('.cart_price p').getText()).toEqual('$14');
		});

		it('show the "+" and "-" quantity "buttons"', function () {
			expect(browser.element('.cart_quantity [data-query="click(quantityPlus)"]').getText()).toEqual('+');
			expect(browser.element('.cart_quantity [data-query="click(quantityMinus)"]').getText()).toEqual('-');
		});

		it('initialzes the product with a quantity of 1', function () {
			expect(browser.element('.cart_quantity input').getValue()).toEqual('1');
		});

		it('show the correct inital total product price', function () {
			expect(browser.element('.cart_total_price').getText()).toBe('$14');
		});

		it('increments item count and price correctly via the "+" button', function () {
			browser.click('[data-query="click(quantityPlus)"]');
			browser.pause(20);

			expect(browser.element('.cart_quantity_button input').getAttribute('value')).toEqual('2');
			expect(browser.element('.cart_total_price').getText()).toEqual('$28');

			browser.click('[data-query="click(quantityPlus)"]');
			browser.pause(20);

			expect(browser.element('.cart_quantity_button input').getAttribute('value')).toEqual('3');
			expect(browser.element('.cart_total_price').getText()).toEqual('$42');
		});

		it('updates the price when changing the input value', function () {
			browser.setValue('.cart_quantity input', '4');
			browser.pause(100);
			expect(browser.element('.cart_total_price').getText()).toEqual('$56');
		});

		it('lowers the items count and price then clicking the "-" button', function () {
			browser.setValue('.cart_quantity input', 4);
			browser.pause(100);

			browser.click('[data-query="click(quantityMinus)"]');
			browser.pause(20);

			expect(browser.element('.cart_quantity_button input').getValue()).toEqual('3');
			expect(browser.element('.cart_total_price').getText()).toEqual('$42');

			browser.click('[data-query="click(quantityMinus)"]');
			browser.pause(20);

			expect(browser.element('.cart_quantity_button input').getValue()).toEqual('2');
			expect(browser.element('.cart_total_price').getText()).toEqual('$28');
		});
	});

	describe('multiple items (product 1 and product 6)', function () {
		beforeEach(function () {
			reset();
			addProduct(1);
			navigateToHome();
			addProduct(6);
		});

		it('shows the correct image for a second item', function () {
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) img').getAttribute('src')).toMatch(/6-small\.jpg$/);
		});

		it('shows the correct title for a second item', function () {
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_description').getText()).toEqual('Official dress - Beige/Blue');
		});

		it('shows the correct price for a second item', function () {
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_price ').getText()).toEqual('$32');
		});

		it('show the correct inital total product price for a second product', function () {
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_total_price').getText()).toBe('$32');
		});

		it('increments item count and price correctly via the "+" button', function () {
			browser.click('[data-query="each(products)"] tr:nth-child(2) [data-query="click(quantityPlus)"]');
			browser.pause(20);

			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_quantity_button input').getAttribute('value')).toEqual('2');
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_total_price').getText()).toEqual('$64');

			browser.click('[data-query="each(products)"] tr:nth-child(2) [data-query="click(quantityPlus)"]');
			browser.pause(20);

			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_quantity_button input').getAttribute('value')).toEqual('3');
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_total_price').getText()).toEqual('$96');
		});

		it('updates the price when changing the input value', function () {
			browser.setValue('[data-query="each(products)"] tr:nth-child(2) .cart_quantity input', '4');
			browser.pause(100);
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_total_price').getText()).toEqual('$128');
		});

		it('lowers the items count and price then clicking the "-" button', function () {
			browser.setValue('[data-query="each(products)"] tr:nth-child(2) .cart_quantity input', 4);
			browser.pause(100);

			browser.click('[data-query="each(products)"] tr:nth-child(2) [data-query="click(quantityMinus)"]');
			browser.pause(20);

			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_quantity_button input').getValue()).toEqual('3');
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_total_price').getText()).toEqual('$96');

			browser.click('[data-query="each(products)"] tr:nth-child(2) [data-query="click(quantityMinus)"]');
			browser.pause(20);

			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_quantity_button input').getValue()).toEqual('2');
			expect(browser.element('[data-query="each(products)"] tr:nth-child(2) .cart_total_price').getText()).toEqual('$64');
		});
	});

	describe('checkout section', function () {
		it('shows the correct sub total price', function () {
			reset();
			addProduct(1);

			expect(browser.element('#do_action .total_area li:first-child span').getText()).toEqual('$14');
		});

		it('shows the correct total price', function () {
			reset();
			addProduct(1);

			expect(browser.element('#do_action .total_area li:nth-child(4) span').getText()).toEqual('$21');
		});

		it('updates the sub total price if the quantity is changed', function () {
			reset();
			addProduct(1);

			browser.setValue('[data-query="each(products)"] .cart_quantity_button input', 2);

			expect(browser.element('#do_action .total_area li:first-child span').getText()).toEqual('$28');
		});

		it('updates the total price if the quantity is changed', function () {
			reset();
			addProduct(1);

			browser.setValue('[data-query="each(products)"] .cart_quantity_button input', 2);

			expect(browser.element('#do_action .total_area li:nth-child(4) span').getText()).toEqual('$35');
		});

		it('shows the sub total for multiple items', function () {
			reset();
			addProduct(1);
			navigateToHome();
			addProduct(6);

			expect(browser.element('#do_action .total_area li:first-child span').getText()).toEqual('$46');

		});

		it('shows the sub total for multiple items', function () {
			reset();
			addProduct(1);
			navigateToHome();
			addProduct(6);

			expect(browser.element('#do_action .total_area li:nth-child(4) span').getText()).toEqual('$53');
		});

		it('resets the cart when clicking the "checkout" button', function () {
			reset();
			addProduct(1);
			navigateToHome();
			addProduct(6);

			expect(browser.elements('[data-query="each(products)"] tr').value.length).toBe(2);
			browser.click('[data-query="click(checkOut)"]');
			browser.pause(20);

			expect(browser.elements('[data-query="each(products)"] tr').value.length).toBe(0);
			expect(browser.element('.empty-cart').isVisible()).toBe(true);
		});
	});

});