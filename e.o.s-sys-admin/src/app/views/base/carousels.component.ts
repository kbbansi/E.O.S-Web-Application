import {Component, OnInit} from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { CarouselConfig } from 'ngx-bootstrap/carousel';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { ApiService } from '../../../services/api.service';

@Component({
  templateUrl: 'carousels.component.html',
  providers: [
    { provide: CarouselConfig, useValue: { interval: 1500, noPause: false } },
  ]
})
export class CarouselsComponent implements OnInit {
  salesPersonnelDataBucket: any;
  salesPersonnel: any;

  modalRef: BsModalRef;
  salesPersonnelPermForm: FormGroup;

  constructor(
    private api: ApiService,
    private formBuilder: FormBuilder,
    private modal: BsModalService
    ) {
      this.salesPersonnelForm();
    }

  ngOnInit(): void {
    this.getsalesPersonnel();
    this.getsalesPersonnelPerm();
  }


  salesPersonnelForm() {}

  getsalesPersonnel() {
    console.log('Init get store managers method');
    this.api.getSalesPersonnel().subscribe(response => {
      console.info(response);
      this.salesPersonnelDataBucket = response;
      if(this.salesPersonnelDataBucket.status === 200) {
        this.salesPersonnel = this.salesPersonnelDataBucket.message;
      }
    });
  }

  getsalesPersonnelPerm() {
    console.log('Init get store managers permission')
  }

}
