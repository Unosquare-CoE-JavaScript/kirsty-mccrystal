import "reflect-metadata"
import { plainToClass } from 'class-transformer'
import { validate } from 'class-validator'

import { Product } from './product.model';

const products = [
  {title: 'something', price: 10.00}, 
  {title: 'something else', price: 40.00}
];

const newProd = new Product('', -6.99)
validate(newProd).then(errors => {
  if (errors.length > 0) {
    console.log(errors);
  } else {
    console.log(newProd)
  }
})

//const p1 = new Product('book', 11.99);

// const loadedProducts = products.map(prod => {
//   return new Product(prod.title, prod.price)
// })

const loadedProducts = plainToClass(Product, products)

for (const prod of loadedProducts) {
  console.log(prod.getInfo())
}

//console.log(p1.getInfo());


// --- working with third party ---
// import _ from 'lodash'

// declare var GLOBAL: any;

// console.log(_.shuffle([1,2,3]));

// console.log(GLOBAL);