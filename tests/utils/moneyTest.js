import {formatCurrency} from '../../scripts/utils/money.js'; // import the formatCurrency function from the money.js file to format price in dollars and cents

describe('test suite: formatCurrency', () => {
  it('should format cents to dollars and cents with a dollar sign', () => {
    expect(formatCurrency(2095)).toBe('$20.95');
    expect(formatCurrency(2000.5)).toBe('$20.01');
  }); 
  it('works with 0', () => {
    expect(formatCurrency(0)).toBe('$0.00');
  });
  it('rounds to the nearest cent', () => {
    expect(formatCurrency(1999.5)).toBe('$20.00');
    expect(formatCurrency(1999.4)).toBe('$19.99');
  });
});