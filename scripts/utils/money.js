export function formatCurrency(cents) {
  return `$${(cents / 100).toFixed(2)}`;
} // this function takes in a price in cents and returns a string formatted in dollars and cents, with a dollar sign at the beginning, and two decimal places
export default formatCurrency; // this line exports the formatCurrency function as the default export of this module, allowing it to be imported and used in other files without needing to specify its name explicitly