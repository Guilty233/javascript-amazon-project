export function formatCurrency(cents) {
  return `$${(Math.round(cents) / 100).toFixed(2)}`;
} // this function takes in a price in cents and returns a string formatted in dollars and cents, with a dollar sign at the beginning, and two decimal places
// Note: `formatCurrency` is exported as a named export only.