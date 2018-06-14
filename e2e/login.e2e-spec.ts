import {browser, by, element} from 'protractor';

describe('Test for booking feature', function () {
  it('should login', function () {
    browser.get('/login');

    const email = element(by.css('input[formControlName=email]'));
    email.sendKeys('a@b.dk');
    expect(email.getAttribute('value')).toBe('a@b.dk');

    const password = element(by.css('input[formControlName=password]'));
    password.sendKeys('secret');
    expect(password.getAttribute('value')).toBe('secret');

    // Find the first (and only) button on the page and click it
    element.all(by.className('btn')).get(0).click();

    browser.wait(function () {
      return browser.getCurrentUrl().then(function (url) {
        console.log('Url', url);
        return /portal/.test(url);
      });
    }, 1000, 'URL hasn\'t changed');
  });

  it('should view first house', function () {
    element.all(by.css('.card')).get(0).click();
    expect(element(by.id('house')).isElementPresent(by.id('btn-book'))).toBe(true);
  });

  it('should go to booking page', function () {
    element.all(by.id('btn-book')).click();
    expect(element(by.css('h2')).getText()).toEqual('BOOKING');
  });

  it('should not create a booking with invalid input', function () {
    const startDate = element.all(by.tagName('input')).get(0);
    startDate.sendKeys('2018-09-27');
    expect(startDate.getAttribute('value')).toBe('2018-09-27');

    const endDate = element.all(by.tagName('input')).get(1);
    endDate.sendKeys('2018-09-25');
    expect(endDate.getAttribute('value')).toBe('2018-09-25');

    expect(element(by.css('form')).isElementPresent(by.css('.ng-invalid'))).toBe(true);

  });

  it('should create bookin with valid input', function () {
    const startDate = element.all(by.tagName('input')).get(0);
    startDate.clear();
    startDate.sendKeys('2018-09-27');
    expect(startDate.getAttribute('value')).toBe('2018-09-27');

    const endDate = element.all(by.tagName('input')).get(1);
    endDate.clear();
    endDate.sendKeys('2018-09-31');
    expect(endDate.getAttribute('value')).toBe('2018-09-31');

    // Find the submit button on the page and click it
    element.all(by.className('btn-primary')).get(0).click();
    expect(element(by.id('house')).isElementPresent(by.id('btn-book'))).toBe(true);
  });
});
