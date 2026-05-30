import {renderOrderSummary} from './checkout/orderSummary.js'; // import the renderOrderSummary function from the orderSummary.js file to display the order summary on the checkout page
import {renderPaymentSummary} from './checkout/paymentSummary.js'; // import the renderPaymentSummary function from the paymentSummary.js file to display the payment summary on the checkout page
import {loadProducts,loadProductsFetch} from '../data/products.js'; // import the loadProducts function from the products.js file to load the products data before rendering the order summary and payment summary on the checkout page
import '../data/backend-practice.js'; 
import {loadCart} from '../data/cart.js'; 

async function loadPage(){
  try{
    // throw 'error';

    await loadProductsFetch(); // wait for the products to finish loading before rendering the order summary and payment summary to ensure that the product information is available when rendering the summaries
  
    const value = await new Promise((resolve, reject) => {
      // throw 'error';
      loadCart(() => {  
        // reject('error');
        resolve('value3');
      });
    });
  } catch (error) {
    console.log('Unexpected error. Please try again later.');
  }
  

  renderOrderSummary();
  renderPaymentSummary();

}
loadPage(); // call the loadPage function to load the products and cart data before rendering the order summary and payment summary on the checkout page to ensure that the product information is available when rendering the summaries
/*
Promise.all([
  loadProductsFetch(),
  new Promise((resolve) => {
    loadCart(() => {  
      resolve();
    });
  })
]).then(() => {
  renderOrderSummary(); // call the renderOrderSummary function to display the order summary on the checkout page after the products and cart data have finished loading to ensure that the product information is available when rendering the order summary
  renderPaymentSummary(); // call the renderPaymentSummary function to display the payment summary on the checkout page after the products and cart data have finished loading to ensure that the product information is available when rendering the payment summary
});
*/
/*
new Promise((resolve) =>{
  //console.log('start loading products');
  loadProducts(() => {
    //console.log('finished loading');
    resolve('value1'); // wait for the products to finish loading before rendering the order summary and payment summary to ensure that the product information is available when rendering the summaries
  });
}).then((value1) => {
  console.log(value1);
  return new Promise((resolve) =>{
    loadCart(() => {
      resolve('value2');
    });
  });
}).then((value2) => {
  console.log(value2);
  renderOrderSummary();
  renderPaymentSummary();
});
*/
/*
loadProducts(() => {
  loadCart(() => {
    renderOrderSummary(); // call the renderOrderSummary function to display the order summary on the checkout page
    renderPaymentSummary(); // call the renderPaymentSummary function to display the payment summary on the checkout page
  });
});
*/ 