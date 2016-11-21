describe('brands', function () {
	beforeAll(function () {
		browser.url('/');
		browser.waitForReadyView('Home');
		browser.waitForExist('[data-query="view(Home)"] [data-query="each(brands)"]');
	});

	it('renders all brands on load', function () {
		expect(browser.elements('[data-query="each(brands)"] .panel').value.length).toBe(3);
	});

	it('marks the first brand as active', function () {
		expect(browser.element('[data-query="each(brands)"] .panel:first-child a').getAttribute('class')).toEqual('active');
	});

	it('only marks one brand as active', function () {
		expect(browser.elements('[data-query="each(brands)"] a.active').value.length).toBe(1);
	});

	it('updates the current brand on click', function () {
		browser.element('[data-query="each(brands)"] .panel:nth-child(2) a').click();
		expect(browser.element('[data-query="each(brands)"] .panel:nth-child(2) a').getAttribute('class')).toEqual('active');
		expect(browser.element('[data-query="each(brands)"] .panel:first-child a').getAttribute('class')).not.toEqual('active');
	});

	var brands = ['ALL', 'LIMA', 'RACH'];
	it('inserted all link texts correctly', function () {
		browser.elements('[data-query="each(brands)"] .panel a').value.forEach(function (link, i) {
			expect(link.getText()).toBe(brands[i]);
		});
	});
});