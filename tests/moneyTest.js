import {formatCurrency} from '../scripts/utils/money.js'; // import the formatCurrency function from the money.js file to format price in dollars and cents

// Test cases for the formatCurrency function
if(formatCurrency(2095) === '$20.95') {
  console.log('passed');
} else {
  console.log('failed');
}
if(formatCurrency(2000.5) === '$20.01') {
  console.log('passed');
} else {
  console.log('failed');
}