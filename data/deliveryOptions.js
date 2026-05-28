export const deliveryOptions =[{
  id: '1',
  days: 7,
  priceCents: 0
}, {
  id: '2',
  days: 3,
  priceCents: 499
}, {
  id: '3',
  days: 1,
  priceCents: 999
}];
export function getDeliveryOption(deliveryOptionId) {
  let deliveryOption;
    deliveryOptions.forEach((option) => {
      if (option.id === deliveryOptionId) {
        deliveryOption = option;
      }
    }); // find the delivery option that matches the one selected for this cart item, so that we can display the correct delivery date and price for the selected delivery option
  return deliveryOption || deliveryOptions[0]; // if no matching delivery option is found, return the default delivery option (the first one in the array)
}