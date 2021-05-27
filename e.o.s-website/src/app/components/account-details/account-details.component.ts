import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from 'src/services/api.service';

@Component({
  selector: 'app-account-details',
  templateUrl: './account-details.component.html',
  styleUrls: ['./account-details.component.css']
})
export class AccountDetailsComponent implements OnInit {
  firstName: any;
  lastName: any;
  otherNames: any;
  id: any;
  email: any;
  userName: any;
  userType: any;
  contactNo: any;

  shippingInfoForm: FormGroup;
  userDetailsForm: FormGroup;
  dataBucket: any = {};
  shippingDetails: any = {};
  streetName: any;
  streetNo: any;
  district: any;
  region: any;
  ghanaPostCode: any;

  constructor(private router: Router, private formBuilder: FormBuilder, private api: ApiService) {
    this.firstName = sessionStorage.getItem('firstName');
    this.lastName = sessionStorage.getItem('lastName');
    this.otherNames = sessionStorage.getItem('otherNames');
    this.id = sessionStorage.getItem('id');
    this.email = sessionStorage.getItem('email');
    this.userName = sessionStorage.getItem('userName');
    this.userType = sessionStorage.getItem('userType');
    this.contactNo = sessionStorage.getItem('contactNo');

    this.createShippingInfoForm();
    this.createUserDetailsForm();
  }

  ngOnInit(): void {
    this.getUserShippingInfo();
  }

  goBack() {
    this.router.navigate(['/profile'])
  }

  createShippingInfoForm() {
    this.shippingInfoForm = this.formBuilder.group({
      streetName: ['', Validators.required],
      streetNo: ['', Validators.required],
      district: ['', Validators.required],
      region: ['', Validators.required],
      ghanaPostCode: ['', Validators.required],
      id: this.id
    })
  }

  createUserDetailsForm() {
    this.userDetailsForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      userName: ['', Validators.required],
      contactNo: ['', Validators.required],
      id: this.id
    })
  }

  getUserShippingInfo() {
    console.log(sessionStorage.getItem('id'));
    let id = sessionStorage.getItem('id');
    this.api.getUserShippingInfo(id).subscribe(response => {
      // console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        // alert('Awesome Shipping Info')
        this.shippingDetails = this.dataBucket.message;
        // console.log(this.shippingDetails)

        //set user details
        // console.log(this.shippingDetails[0].streetName);
        this.streetName = this.shippingDetails[0].streetName;
        this.streetNo = this.shippingDetails[0].streetNo;
        this.district = this.shippingDetails[0].district;
        this.region = this.shippingDetails[0].region;
        this.ghanaPostCode = this.shippingDetails[0].ghanaPostCode;
      } else {
        //blah
      }
    });
  }

  saveShippingInfo() {
    console.log(this.shippingInfoForm.value);
    this.api.createUserShippingInfo(this.shippingInfoForm.value).subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 201) {
        alert('Saved Shipping Details ');
      }
    })
  }

  saveUserDetails() {
    console.log(this.userDetailsForm.value);
    this.api.updateUserDetails(this.userDetailsForm.value).subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        alert('Details Updated');
        // reset session
        this.resetSession(this.dataBucket.stream);
        location.reload();
        this.router.navigate(['/profile/account-details']);
      }
    })
  }

  resetSession(d: any){
    sessionStorage.setItem('contactNo', d.contactNo);
    sessionStorage.setItem('email', d.email);
    sessionStorage.setItem('firstName', d.firstName);
    sessionStorage.setItem('lastName', d.lastName);
    sessionStorage.setItem('userName', d.userName);
    sessionStorage.setItem('otherNames', d.otherNames);
    // sessionStorage.setItem('userType', d.userType);
    // sessionStorage.setItem('password', d.password);
  }
}
