import { Component } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  templateUrl: 'typography.component.html'
})
export class TypographyComponent {
  salesPersonnel: any = {};
  dataBucket: any = {};
  constructor(
    private api: ApiService,
  ) {}

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
  
  addSalesPersonnel() {}

}
