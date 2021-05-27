import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-order',
  templateUrl: './order.component.html',
  styleUrls: ['./order.component.css']
})
export class OrderComponent implements OnInit {
  firstName: any;
  lastName: any;
  otherNames: any;
  id: any;
  email: any;
  userName: any;
  userType: any;
  contactNo: any;
  pageNum: number;

  userOrders: any = {};
  dataBucket: any = {};

  constructor(private router: Router, private api: ApiService) {
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
    this.getUserOrders();
  }

  goBack(){
    this.router.navigate(['/profile'])
  }

  getUserOrders() {
    // alert(`Welcome ${this.firstName}\nYour user ID is ${this.id}`);
    this.api.getUserOrders(this.id).subscribe(response => {
      // console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        // alert('Loading User Orders');
        console.log(this.dataBucket.message)
        this.userOrders = this.dataBucket.message;
      } else {
        alert('You haven\'t made any orders yet')
      }
    })
  }
}
