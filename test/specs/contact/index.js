function sendForm () {
	browser.click('[data-query="click(send)"]');
	browser.pause(20);
}

describe('contact', function () {
	beforeAll(function () {
		browser.url('/contact');
	});
	it('does not show validation erros on load', function () {
		browser.url('/contact');
		browser.elements('.error-message').value.forEach(function (element) {
			expect(element.isVisible()).toBe(false);
		});
	});

	it('shows error messages with empty fields', function () {
		sendForm();

		expect(browser.element('[data-query="template(error, message.name)"] span').getText()).toEqual('( Please enter your name )');
		expect(browser.element('[data-query="template(error, message.email)"] span').getText()).toEqual('( Please enter your email )');
		expect(browser.element('[data-query="template(error, message.subject)"] span').getText()).toEqual('( Please enter a subject )');
		expect(browser.element('[data-query="template(error, message.content)"] span').getText()).toEqual('( Please enter a content )');
	});

	it('hides the error message if a name is entered', function () {
		browser.setValue('#name', 'aaaaaa');
		sendForm();

		expect(browser.element('[data-query="template(error, message.name)"] span').isVisible()).toBe(false);
	});

	it('shows an error message if an invalid email is entered', function () {
		browser.setValue('#email', 'aaaaaaaa');
		sendForm();

		expect(browser.element('[data-query="template(error, message.email)"] span').getText()).toEqual('( Please enter a valid email )');
	});

	it('hides the error message if a valid email-address is entered', function () {
		browser.setValue('#email', 'aaaaaaaaa@aaaaaaa.aa');
		sendForm();

		expect(browser.element('[data-query="template(error, message.email)"] span').isVisible()).toBe(false);
	});

	it('hides the error message if a subject is entered', function () {
		browser.setValue('#subject', 'aaaaaa');
		sendForm();

		expect(browser.element('[data-query="template(error, message.subject)"] span').isVisible()).toBe(false);
	});

	it('shows a "too shoer message" error', function () {
		browser.setValue('#message', 'aaaaaa');
		sendForm();

		expect(browser.element('[data-query="template(error, message.content)"] span').getText()).toEqual('( Message too short. Make it longer )');
	});

	it('send and resets the form if all fields are filled correctly', function () {
		browser.setValue('#message', 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa');
		sendForm();

		expect(browser.alertText()).toBe('Message sent successfully. Congratulations!');
		browser.alertAccept();

		expect(browser.element('#name').getText()).toEqual('');
		expect(browser.element('#email').getText()).toEqual('');
		expect(browser.element('#subject').getText()).toEqual('');
		expect(browser.element('#message').getText()).toEqual('');
	});
});