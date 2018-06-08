import {browser, by, element} from 'protractor';

describe('booking test', function() {
  it('should create booking', function () {
    browser.get('/booking/1');

    const startDate = element(by.css('input[formControlName=startDate]'));
    startDate.sendKeys('2018-07-27');
    expect(startDate.getAttribute('value')).toBe('2018-07-27');

    const endDate = element(by.css('input[formControlName=endDate]'));
    endDate.sendKeys('2018-07-31');
    expect(endDate.getAttribute('value')).toBe('2018-07-31');

    // Find the first (and only) button on the page and click it
    element.all(by.tagName('button')).get(1).click();

    const msg = element.all(by.tagName('p')).get(1);
    expect(msg.getText()).toBe('OK');
  });
});
