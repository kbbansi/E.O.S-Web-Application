import { Component, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent {
  salesPersonnel: any = {};
  dataBucket: any = {};
  personnelForm: FormGroup;
  modalRef: BsModalRef;
  
  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modal: BsModalService
  ) {
    this.salesPersonnelForm();
  }

  ngOnInit(): void {
    this.getSalesPersonnel();
  }

  getSalesPersonnel() {
    this.api.getSalesPersonnel().subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        this.salesPersonnel  = this.dataBucket.message;
      } else {
      }
    });
  }
  
  salesPersonnelForm(){
    this.personnelForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      contactNo: ['', Validators.required],
      userType: 2
    });
  }

  addSalesPersonnelModal(template: TemplateRef<any>) {
    this.personnelForm = this.formBuilder.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      otherNames: ['', Validators.required],
      email: ['', Validators.required],
      contactNo: ['', Validators.required],
      userType: 2
    });
    this.modalRef = this.modal.show(template);
  }


  addSalesPersonnel() {
    console.log(this.personnelForm.value);
    this.api.addNewSalesPersonnel(this.personnelForm.value).subscribe(response => {
      this.dataBucket = response;
      if(this.dataBucket.status === 201) {
        alert("You've added a new Sales Personnel!")
        console.log(response);
        this.personnelForm.reset();
        this.ngOnInit();
        this.modalRef.hide();
      }
    });
  }

}
