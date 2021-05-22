import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  dataBucket: any = {};
  products: any = {};
  counter: number = 0;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.getAllProducts();
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

  addToCart() {
    alert('Added to cart!');
    this.counter++;
    console.log(this.counter);
  }


}
