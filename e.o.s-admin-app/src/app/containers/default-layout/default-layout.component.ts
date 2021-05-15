import {Component} from '@angular/core';
import { navItems } from '../../_nav';

@Component({
  selector: 'app-dashboard',
  templateUrl: './default-layout.component.html'
})
export class DefaultLayoutComponent {
  contactNo: any;
  firstName: any;
  lastName: any;
  otherNames: any;
  email: any;
  userType: any
  public sidebarMinimized = false;
  public navItems = navItems;

  toggleMinimize(e) {
    this.sidebarMinimized = e;
  }

  constructor() {
    this.checkSession();
    console.log(this.firstName);
  }
  
  checkSession() {
    console.log('Checking session');
    this.contactNo = sessionStorage.getItem('contactNo');
    this.firstName = sessionStorage.getItem('firstName');
    this.lastName = sessionStorage.getItem('lastName');
    this.otherNames = sessionStorage.getItem('otherNames');
    this.email = sessionStorage.getItem('email');
    this.userType = sessionStorage.getItem('userType');
  }
}
