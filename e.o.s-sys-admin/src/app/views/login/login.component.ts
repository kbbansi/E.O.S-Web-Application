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
  }
}
