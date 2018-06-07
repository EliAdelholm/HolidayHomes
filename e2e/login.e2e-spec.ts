import {browser, by, element} from 'protractor';

describe('login test', function() {
  it('should login', function() {
    browser.get('/login');

    const email = element(by.css('input[formControlName=email]'));
    email.sendKeys('a');
    expect(email.getAttribute('value')).toBe('a');

    const password =  element(by.css('input[formControlName=password]'));
    password.sendKeys('a');
    expect(email.getAttribute('value')).toBe('a');

    // Find the first (and only) button on the page and click it
    element.all(by.tagName('button')).get(1).click();

    // browser.wait(function() {
    //   return browser.getCurrentUrl().then(function(url) {
    //     console.log('Url', url);
    //     return /portal/.test(url);
    //   });
    // }, 5000, 'URL hasn\'t changed');
  });
});
