import {renderOrderSummary} from './checkout/orderSummary.js'; // import the renderOrderSummary function from the orderSummary.js file to display the order summary on the checkout page
import {renderPaymentSummary} from './checkout/paymentSummary.js'; // import the renderPaymentSummary function from the paymentSummary.js file to display the payment summary on the checkout page
import '../data/cart-class.js'; // import the cart class to manage the shopping cart functionality on the checkout page
renderOrderSummary(); // call the renderOrderSummary function to display the order summary on the checkout page
renderPaymentSummary(); // call the renderPaymentSummary function to display the payment summary on the checkout page