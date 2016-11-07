describe('categories', function () {
	beforeAll(function () {
		browser.url('/');
		browser.waitForExist('[data-query="view(Home)"] #accordian');
	});

	it('renders all nodes on load', function () {
		expect(browser.elements('#accordian .panel').value.length).toBe(5);
	});

	it('marks the first categorie active', function () {
		expect(browser.element('#accordian .panel:first-child a').getAttribute('class')).toBe('active');
	});

	it('only has one active categorie', function () {
		expect(browser.elements('#accordian a.active').value.length).toBe(1);
	});

	it('changes the categorie on click', function () {
		browser.elements('#accordian .panel a').value[2].click();
		expect(browser.elements('#accordian .panel a').value[2].getAttribute('class')).toBe('active');
		expect(browser.element('#accordian .panel:first-child a').getAttribute('class')).not.toBe('active');
	});

	var categories = ['All', 'Boys', 'Girls', 'Babies', 'Underwear'];
	it('renders all categories', function () {
		browser.elements('#accordian .panel a').value.forEach(function (category, i) {
			expect(category.getText()).toBe(categories[i].toUpperCase());
		});
	});
});