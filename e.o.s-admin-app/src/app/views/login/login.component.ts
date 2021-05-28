import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup; // form group creates a new form component
  dataBucket: any = {}; // empty json object to hold responses
  
  
  constructor(private api: ApiService, private formBuilder: FormBuilder, private router: Router) {
    this.createLogin();
  }

  ngOnInit(): void {
    this.index();
  }

  index() {
    this.api.index().subscribe(response => {
      console.log(response);
    });
  }

  createLogin() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.dataBucket = {};
    console.log(this.loginForm.value);
    this.api.login(this.loginForm.value).subscribe(response => {
      // create user session and redirect to dashboard
      console.log(response);
      this.dataBucket = response;
      console.log(this.dataBucket);

      this.createUserSession(this.dataBucket.message);
     this.router.navigate(['dashboard']);
     console.log(sessionStorage.getItem('firstName'));
    })
  }

  createUserSession(d) {
    console.log(d.contactNo);
    sessionStorage.setItem('contactNo', d.contactNo);
    sessionStorage.setItem('email', d.email);
    sessionStorage.setItem('firstName', d.firstName);
    sessionStorage.setItem('lastName', d.lastName);
    sessionStorage.setItem('otherNames', d.otherNames);
    sessionStorage.setItem('userType', d.userType);
  }

}
/**
 *
  contactNo: "0559633956"
  email: "kwabenaampofo5@gmail.com"
  firstName: "Kwabena"
  id: 1
  lastName: "Ampofo"
  otherNames: ""
  password: "$2b$04$9vajus13PtGfmOeHWNQzX.RRT7CAouX6ZGckBKgjBxzMfzZTe3qr6"
  userType: 1
 */