var page1FirstNews = {
	author: 'Antonio Stoilkov',
	time: '11:30 am',
	date: 'Apr 14 2015',
	title: 'SPECIAL OFFERS FOR THE NEXT 3 DAYS'
};

var page2FirstNews = {
	author: 'Mac Doe',
	time: '09:03 am',
	date: 'Apr 03 2015',
	title: 'GIRLS PINK T-SHIRT ARRIVED IN STORE'
};

var firstNewsSelector = '[data-query="each(news.view)"] div:first-child ';

describe('news', function () {
	beforeAll(function () {
		browser.url('/news');
		browser.waitForReadyView('News');
	});

	it('shows the title of the first news', function () {
		expect(browser.element(firstNewsSelector + 'h3').getText()).toEqual(page1FirstNews.title);
	});

	it('shows the author of the first news', function () {
		expect(browser.element(firstNewsSelector + 'ul li:first-child').getText()).toEqual(page1FirstNews.author);
	});

	it('shows the time of the first news', function() {
		expect(browser.element(firstNewsSelector + 'ul li:nth-child(2)').getText()).toEqual(page1FirstNews.time);
	});

	it('shows the date of the first news', function () {
		expect(browser.element(firstNewsSelector + 'ul li:nth-child(3)').getText()).toEqual(page1FirstNews.date);
	});

	it('does not show the complete text', function () {
		expect(browser.element(firstNewsSelector + '.read-more').isVisible()).toBe(false);
	});

	it('shows the complete text after clicking the read-more button', function () {
		browser.click(firstNewsSelector + '[data-query="click(toggle)"]');
		browser.pause(20);

		expect(browser.element(firstNewsSelector + '.read-more').isVisible()).toBe(true);
	});

	it('hides the text after clicking read less', function () {
		browser.click(firstNewsSelector + '[data-query="click(toggle)"]');
		browser.pause(20);

		expect(browser.element(firstNewsSelector + '.read-more').isVisible()).toBe(false);
	});

	it('shows the title of the first news of the second page', function () {
		browser.click('[data-query="each(pages)"] li:nth-child(3) a');
		expect(browser.element(firstNewsSelector + 'h3').getText()).toEqual(page2FirstNews.title);
	});

	it('shows the author of the first news of the second page', function () {
		browser.click('[data-query="each(pages)"] li:nth-child(3) a');
		expect(browser.element(firstNewsSelector + 'ul li:first-child').getText()).toEqual(page2FirstNews.author);
	});

	it('shows the time of the first news of the second page', function() {
		browser.click('[data-query="each(pages)"] li:nth-child(3) a');
		expect(browser.element(firstNewsSelector + 'ul li:nth-child(2)').getText()).toEqual(page2FirstNews.time);
	});

	it('shows the date of the first news of the second page', function () {
		browser.click('[data-query="each(pages)"] li:nth-child(3) a');
		expect(browser.element(firstNewsSelector + 'ul li:nth-child(3)').getText()).toEqual(page2FirstNews.date);
	});

});