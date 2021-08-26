import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;
  dataBucket: any = {};

  constructor(private formBuilder: FormBuilder, private router: Router, private api: ApiService) {
    this.createLoginForm();
  }

  ngOnInit() {
    this.wakeUpServer();
  }

  wakeUpServer() {
    // hit index route
    this.api.index().subscribe(response => {
      console.log(response);
    });
  }

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  login() {
    this.dataBucket = {};
    console.log(this.loginForm.value);
    this.api.login(this.loginForm.value).subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      this.createUserSession(this.dataBucket.message);
      this.router.navigate(['dashboard']);
    })
  }

  createUserSession(d) {
    sessionStorage.setItem('contactNo', d.contactNo);
    sessionStorage.setItem('email', d.email);
    sessionStorage.setItem('firstName', d.firstName);
    sessionStorage.setItem('lastName', d.lastName);
    sessionStorage.setItem('otherNames', d.otherNames);
    sessionStorage.setItem('userType', d.userType);
  }
}
