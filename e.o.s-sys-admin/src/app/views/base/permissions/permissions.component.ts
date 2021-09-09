import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../../services/api.service';

@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.scss']
})
export class PermissionsComponent implements OnInit {
  storeManagerDataBucket: any;
  permDataBucket: any;
  storeManager: any;

  modalRef: BsModalRef;
  storeManagersPermForm: FormGroup;
  
  isCollapsed: boolean = false;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modal: BsModalService
    ) {
      this.storeManagerForm();
    }

  ngOnInit(): void {
    this.getStoreManagers();
  }


  storeManagerForm() {
    this.storeManagersPermForm = this.formBuilder.group({
      addProduct: ['', Validators.required],
      editProduct: ['', Validators.required],
      addCategory: ['', Validators.required],
      editCategory: ['', Validators.required]
    });
  }

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

  getStoreManagerPerm(id: Number) {
    console.log('Init get store managers permission')
    this.api.getStoreManagerPerm(id).subscribe(response => {
      this.permDataBucket = response;
      console.log(this.permDataBucket.message);
    });
  }

}
