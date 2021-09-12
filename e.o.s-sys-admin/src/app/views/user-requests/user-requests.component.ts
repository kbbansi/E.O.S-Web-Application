import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
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
  userRequestForm: FormGroup;

  constructor(private api: ApiService, private formBuilder: FormBuilder, private modalService: BsModalService) {
    this.createUserRequestForm();
  }

  ngOnInit(): void {
    this.getAllRequests();
  }

  createUserRequestForm() {}

  getAllRequests() {
    this.api.getUserRequests().subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      this.userRequests = this.dataBucket.message;
    });
  }

  openPasswordResetModal(template: TemplateRef<any>) {}

}
