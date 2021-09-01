import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  storeManagerDataBucket: any;
  storeManager: any;

  modalRef: BsModalRef;
  storeManagersPermForm: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modal: BsModalService
    ) {
      this.storeManagerForm();
    }

  ngOnInit(): void {
    this.getStoreManagers();
    this.getStoreManagerPerm();
  }


  storeManagerForm() {}

  getStoreManagers() {
    console.log('Init get store managers method');
    this.api.getStoreManagers().subscribe(response => {
      console.info(response);
      this.storeManagerDataBucket = response;
      if(this.storeManagerDataBucket.status === 200) {
        this.storeManager = this.storeManagerDataBucket.message;
      }
    });
  }

  getStoreManagerPerm() {
    console.log('Init get store managers permission')
  }

}
