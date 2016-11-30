describe('search', function () {
	beforeAll(function () {
		browser.url('/');
		browser.waitForReadyView('Home');
	});

	it('does not show items on load', function () {
		expect(browser.elements('[data-query="each(searchItems.view)"] li').value.length).toBe(0);
	});

	it('shows 2 items when seaching for q', function () {
		browser.setValue('[data-query="val(search)"]', 'q');
		browser.pause(20);
		expect(browser.elements('[data-query="each(searchItems.view)"] li').value.length).toBe(2);
	});

	it('shows the headline and price of the first item', function () {
		expect(browser.element('[data-query="each(searchItems.view)"] li:first-child h4').getText()).toEqual('Pants with a ribbon - Aqua/Red\n$14');
	});

	it('show the headline and price of the second item', function () {
		expect(browser.element('[data-query="each(searchItems.view)"] li:nth-child(2) h4').getText()).toEqual('Pants - Black/Aqua\n$20');
	});

	it('navigates to the product on click and clears the search bar', function () {
		browser.click('[data-query="each(searchItems.view)"] li:first-child');
		browser.pause(20);

		expect(browser.getUrl()).toMatch(/\/product\/5$/);
		expect(browser.element('[data-query="val(search)"]').getValue()).toEqual('');
	});

	it('shows 8 results when searching for "ribbon"', function () {
		browser.setValue('[data-query="val(search)"]', 'ribbon');
		browser.pause(20);

		expect(browser.elements('[data-query="each(searchItems.view)"] li').value.length).toBe(8);
	});

	it('showd no results after emptying the search field', function () {
		// For some reason the "change" event doesn't get fired when setting an input to an empty string with wdio ...
		// so set it to the last character and send a backspace keypress event = \uE003
		browser.setValue('[data-query="val(search)"]', 'r');
		browser.keys('\uE003');
		browser.pause(20);

		expect(browser.elements('[data-query="each(searchItems.view)"] li').value.length).toBe(0);
	});

});