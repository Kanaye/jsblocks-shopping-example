describe('pagination', function () {
	beforeAll(function () {
		browser.url('/');
		browser.waitForExist('.pagination-area');
	});
	it('renders 8 childs + the header and fotter item', function () {
		expect(browser.elements('.pagination li').value.length).toBe(10);
	});

	it('marks the header item inactive', function () {
		expect(browser.element('.pagination li:first-child').getAttribute('class')).toBe('inactive');
	});

	it('marks the first non header item active (index 2)', function () {
		expect(browser.element('.pagination li:nth-child(2) a').getAttribute('class')).toBe('active');
	});

	it('it updates the classes (active, inactive, noclass) correctly on click of an other item', function () {
		browser.element('.pagination li:nth-child(3) a').click();
		expect(browser.element('.pagination li:first-child').getAttribute('class')).not.toBe('inactive');
		expect(browser.element('.pagination li:nth-child(2) a').getAttribute('class')).not.toBe('active');
		expect(browser.element('.pagination li:nth-child(3) a').getAttribute('class')).toBe('active');
	});
});