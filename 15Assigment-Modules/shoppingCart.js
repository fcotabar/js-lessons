// Exporting module
console.log('Eporting module');


//////////////////////////////////////////
// NAME EXPORT/IMPORT
//////////////////////////////////////////

const shippingCost = 10;
const cart = [];

export const addToCart = function (product, quantity) {
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
};

const getCart = function () {
    console.log(cart);
};

export { shippingCost, getCart };


//////////////////////////////////////////
// DEFAULT EXPORT/IMPORT
//////////////////////////////////////////

export default function (product, quantity) { // no name added to the function
    cart.push({ product, quantity });
    console.log(`${quantity} ${product} added to the cart`);
}
