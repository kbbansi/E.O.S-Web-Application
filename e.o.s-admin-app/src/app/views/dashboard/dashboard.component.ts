import { Component, OnInit } from '@angular/core';
import { getStyle, hexToRgba } from '@coreui/coreui/dist/js/coreui-utilities';
import { CustomTooltips } from '@coreui/coreui-plugin-chartjs-custom-tooltips';
import { ApiService } from '../../../services/api.service';

@Component({
  templateUrl: 'dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  dataBucket: any = {};
  products: any = {};
  users: any = {};
  sales: any = {};
  orders: any = {};

  constructor(private api: ApiService) {}

  ngOnInit(): void {
    this.getProductAnalytics();
    this.getUsersAnalytics();
    this.getSalesAnalytics();
    this.getOrdersAnalytics();
  }

  getProductAnalytics() {
    console.log('Getting product analytics...');
    this.api.getProductAnalytics().subscribe(response => {
      console.log(response);
      this.products = response.message[0];
      console.log(this.products);
    })
  }

  getUsersAnalytics() {
    console.log('Getting users analytics...');
    this.api.getUserAnalytics().subscribe(response => {
      console.log(response);
      this.users = response.message[0];
    })
  }

  getSalesAnalytics() {
    console.log('Getting Sales analytics...');
    this.api.getSalesAnalytics().subscribe(response => {
      console.log(response);
      this.sales = response.message[0];
    })
  }


  getOrdersAnalytics() {
    console.log('Getting Order analytics....');
    this.api.getOrderAnalytics().subscribe(response => {
      console.log(response);
      this.orders = response.message[0];
    })
  }
}
