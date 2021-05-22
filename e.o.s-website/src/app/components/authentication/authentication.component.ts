import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/services/auth.service';

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrls: ['./authentication.component.css']
})
export class AuthenticationComponent implements OnInit {
  registerForm: any = FormGroup;
  dataBucket: any = {};

  constructor(private router: Router, private formBuilder: FormBuilder, private auth: AuthService) {
    this.createRegisterForm();
  }

  ngOnInit(): void {}

  createRegisterForm() {
    this.registerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      password: ['', Validators.required],
      contactNo: ['', Validators.required],
      userType: 3
    });
  }

  register(){
    console.log(this.registerForm.value);
    this.auth.register(this.registerForm.value).subscribe(response => {
      this.dataBucket = response;
      if (this.dataBucket.status === 201) {
        alert('Registration Successful');
        this.router.navigate(['/login']);
      }
    })
  }
}
