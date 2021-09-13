import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';

@Component({
  selector: 'app-user-requests',
  templateUrl: './user-requests.component.html',
  styleUrls: ['./user-requests.component.scss']
})
export class UserRequestsComponent implements OnInit {
  dataBucket: any = {};
  userRequests: any = {};
  modalRef: BsModalRef;
  message: String;
  email: String;
  userName: String;
  date: String;
  user_id: Number;
  userRequestForm: FormGroup;
  passwordForm: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private modalService: BsModalService) {
    this.createUserRequestForm();
  }

  ngOnInit(): void {
    this.getAllRequests();
  }

  createUserRequestForm() {
    this.userRequestForm = this.formBuilder.group({
      user_id: ['', Validators.required],
      userName: ['', Validators.required],
      message: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
      status: ['', Validators.required]
    });
  }

  getAllRequests() {
    this.api.getUserRequests().subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      this.userRequests = this.dataBucket.message;
    });
  }

  openPasswordResetModal(template: TemplateRef<any>) {
    this.userRequestForm = this.formBuilder.group({
      user_id: [this.user_id, Validators.required],
      userName: [this.userName, Validators.required],
      message: [this.message, Validators.required],
      email: [this.email, Validators.required],
      password: ['', Validators.required],
      status: ['closed', Validators.required],
      textPassword: ['', Validators.required]
    });
    this.modalRef = this.modalService.show(template);
    console.log(this.userRequestForm.value);
  }

  getInfo(data: any) {
    console.log(data);
    this.userName = data.userName;
    this.message = data.message;
    this.email = data.email;
    this.user_id = data.user_id;
  }

  resolveRequest() {
    let password = this.userRequestForm.value['password'];
    this.userRequestForm.patchValue({ textPassword: password });

    this.api.closeRequest(this.userRequestForm.value).subscribe(response => {
      if (response) {
        console.log(response);
        alert('User Request successfully resolved')
        this.ngOnInit();
      }
    });
  }

}
