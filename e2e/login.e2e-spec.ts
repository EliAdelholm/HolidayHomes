import {browser, by, element} from 'protractor';

describe('login test', function() {
  it('should login', function() {
    browser.get('/login');

    const email = element(by.css('input[formControlName=email]'));
    email.sendKeys('a');
    expect(email.getAttribute('value')).toBe('a');

    const password =  element(by.css('input[formControlName=password]'));
    password.sendKeys('a');
    expect(password.getAttribute('value')).toBe('a');

    // Find the first (and only) button on the page and click it
    element.all(by.className('btn')).get(0).click();

    browser.wait(function() {
      return browser.getCurrentUrl().then(function(url) {
        console.log('Url', url);
        return /portal/.test(url);
      });
    }, 1000, 'URL hasn\'t changed');
  });
});
