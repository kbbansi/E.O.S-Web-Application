import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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
  firstName: any;
  lastName: any;
  otherNames: any;
  id: any;
  email: any;
  userName: any;
  userType: any;
  contactNo: any;

  constructor(private api: ApiService, private router: Router) {
    this.firstName = sessionStorage.getItem('firstName');
    this.lastName = sessionStorage.getItem('lastName');
    this.otherNames = sessionStorage.getItem('otherNames');
    this.id = sessionStorage.getItem('id');
    this.email = sessionStorage.getItem('email');
    this.userName = sessionStorage.getItem('userName');
    this.userType = sessionStorage.getItem('userType');
    this.contactNo = sessionStorage.getItem('contactNo');
  }

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

  logout(){
    console.log('Bye Bye %s', this.firstName);
    sessionStorage.clear();
    this.router.navigate(['/'])
  }

}
