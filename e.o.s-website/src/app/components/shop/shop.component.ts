import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent implements OnInit {
  dataBucket: any = {};
  products: any = {};
  categories: any = {};
  counter: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
    this.getAllCategories();
  }

  getAllProducts() {
    console.log('Fetching Products.....');
    this.api.getAllProducts().subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      // console.log(this.dataBucket.message);
      this.products = this.dataBucket.message
      console.log(this.products);
    })
  }

  getAllCategories() {
    console.log('Fetching Categories......');
    this.api.getAllCategories().subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      this.categories = this.dataBucket.message;
      console.log(this.categories);
    })
  }

  addToCart() {
    alert('Added to cart!');
    this.counter++;
    console.log(this.counter);
  }

}
