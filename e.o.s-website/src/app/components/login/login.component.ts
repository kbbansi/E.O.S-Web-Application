import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: any = {};
  dataBucket: any = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
    this.createLoginForm();
  }

  ngOnInit(): void {}

  createLoginForm() {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    })
  }

  login() {
    console.log(this.loginForm.value);
    this.auth.login(this.loginForm.value).subscribe(response => {
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        alert('Login Successful');
        this.createSession(this.dataBucket.message)
        console.log(sessionStorage.getItem('id'));
        console.log(sessionStorage.getItem('email'))
        this.router.navigate(['/profile'])
      } else {
        alert('Check Your Credentials')
      }
    })
  }

  createSession(d: any){
    sessionStorage.setItem('contactNo', d.contactNo);
    sessionStorage.setItem('email', d.email);
    sessionStorage.setItem('firstName', d.firstName);
    sessionStorage.setItem('lastName', d.lastName);
    sessionStorage.setItem('id', d.id);
    sessionStorage.setItem('userName', d.userName);
    sessionStorage.setItem('otherNames', d.otherNames);
    sessionStorage.setItem('userType', d.userType);
    sessionStorage.setItem('password', d.password);
  }
}
