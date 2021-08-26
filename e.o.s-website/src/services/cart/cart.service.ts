import { Injectable } from '@angular/core';
import { Product } from 'src/app/product';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  items: Product[] = [];
  
  constructor() { }

  //add to cart method
  addToCart(product: Product){
    let count = 1
    let total = product.price;
    product.total = total;
    product.quantity = Number(count);
    product.userID = Number(sessionStorage.getItem('id'));
    this.items.push(product);
    console.log(product.quantity);
    console.log(this.items);
  }

  // get cart items
  getItems(){
    console.log(this.items);
    return this.items;
  }

  increaseQuantity(product: Product){
    console.log(product.id)
    if (product.quantity === product.stock) {
      alert('You\'ve cleared out the stock!!!')
        // disable increase button
    } else {
      product.quantity = product.quantity + 1;
      product.total = product.quantity * product.price; // change to quantity * price
      console.log(product.quantity);
      console.log(product.total); 
    }
  }

  decreaseQuantity(product: Product){
    console.log(product.id);
    if (product.quantity == 0) {
      alert('Removed product from cart');
      this.clearCart();
    } else {
      product.quantity = product.quantity - 1;
      product.total = product.total - product.total;
      console.log(product.quantity);
      console.log(product.total); 
    }
  }

  clearCart(){
    this.items = [];
    location.reload();
    return this.items;
  }

  calculateTotal(product: Product) {
    console.log(product);
    console.log(product.price)
  }
}
