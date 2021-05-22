import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-user-account',
  templateUrl: './user-account.component.html',
  styleUrls: ['./user-account.component.css']
})
export class UserAccountComponent implements OnInit {
  firstName: any;
  lastName: any;
  otherNames: any;
  id: any;
  email: any;
  userName: any;
  userType: any;
  contactNo: any;

  constructor(private router: Router) {
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
    this.loadScript()
  }

  public loadScript() {
    let body = <HTMLDivElement> document.body;
    let script = document.createElement('script');
    script.innerHTML;
    script.src = '../../../assets/sidebar.js';
    script.async = true;
    script.defer = true;
    body.appendChild(script);
  }

  logout(){
    console.log('Bye Bye %s', this.firstName);
    sessionStorage.clear();
    this.router.navigate(['/'])

  }

}
