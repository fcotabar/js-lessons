// Importing module
console.log('Importing module');

//////////////////////////////////////////
// NAME EXPORT/IMPORT
//////////////////////////////////////////

// First way of importing
import { addToCart, getCart, shippingCost } from './shoppingCart.js';
getCart();
addToCart('bread', 10);
addToCart('Milk', 20);
getCart();
console.log(shippingCost);

// Second way of importing
// import * as ShoppingCart from './shoppingCart.js';
// ShoppingCart.getCart();
// ShoppingCart.addToCart('bread', 10);
// ShoppingCart.getCart();
// console.log(ShoppingCart.shippingCost);


//////////////////////////////////////////
// DEFAULT EXPORT/IMPORT
//////////////////////////////////////////

// addCart is added here in the export file doesn't goes a name. Here you can put any name
// import addCart from './shoppingCart.js';
// addCart('Doritos', 50);

//////////////////////////////////////////
// IMPORT LODASH LIBRARY - CloneDeep
//////////////////////////////////////////

import cloneDeep from './node_modules/lodash-es/cloneDeep.js';

