import { Component, OnInit } from '@angular/core';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import {ApiService} from '../../../services/api.service';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  dataBucket: any = {};
  orderBucket: any = {};
  modalRef: BsModalRef;

  constructor(private api: ApiService, private modalService: BsModalService, private excelService: ExcelService) { }

  ngOnInit(): void {
    this.getAllOrders();
  }

  getAllOrders() {
    this.api.getAllOrders().subscribe(response => {
      console.log(response);
      if (response.status === 200) {
        // alert('Orders Found');
        console.log(response.message)
        this.orderBucket = response.message;
      } else {
        alert('No Orders');
      }
    });
  }

  generateExcelReport() {
    this.excelService.exportAsExcelFile(this.orderBucket, 'Order Report');
  }
}
