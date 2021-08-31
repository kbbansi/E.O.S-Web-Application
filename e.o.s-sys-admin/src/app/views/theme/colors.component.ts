import { Component, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  storeManagers: any = {};
  dataBucket: any = {};
  modelRef: BsModalRef
  managerForm: FormGroup
  
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

  getStoreManagers() {
    this.api.getStoreManagers().subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        this.storeManagers  = this.dataBucket.message;
      } else {
        
      }
    });
  }

  storeManagerForm() {
    this.managerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      contactNo: ['', Validators.required],
      userType: []
    })
  }
  
  addStoreManagerModal(template: TemplateRef<any>) {
    this.managerForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      contactNo: ['', Validators.required],
      userType: 1
    });
    this.modelRef = this.modal.show(template);
  }

  closeOpenModal() {
    this.modelRef.hide();
  }

  addNewStoreManager() {
    console.log(this.managerForm.value);
    this.api.addNewAdmin(this.managerForm.value).subscribe(response => {
      this.dataBucket = response;
      if (this.dataBucket.status === 201) {
        alert('You\'ve added a new Manager!!');
        console.log(response);
        this.managerForm.reset();
        this.ngOnInit();
        this.closeOpenModal();
      } else {
        alert('Request failed.\nPlease try again later')    
      }
    });
  }
}
