import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-product-category',
  templateUrl: './product-category.component.html',
  styleUrls: ['./product-category.component.css']
})
export class ProductCategoryComponent implements OnInit {
  dataBucket: any = {};
  products: any = {};
  counter: number = 0;
  categoryID: any = {};


  constructor(private api: ApiService, private routeID: ActivatedRoute) {}

  ngOnInit(): void {
    this.getAllProducts();
    this.routeID.queryParams.subscribe(route => {
      this.categoryID = route['id']
    })
  }

  getAllProducts() {
    // this.routeID.get('id');
    console.log(this.routeID.url['value'][1].path);
    console.log('Fetching Products.....');
    this.api.getProductCategory(this.routeID.url['value'][1].path).subscribe(response => {
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
