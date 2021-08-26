import { Component, OnInit } from '@angular/core';
import { ApiService } from '../../../services/api.service';

@Component({
  templateUrl: 'colors.component.html'
})
export class ColorsComponent implements OnInit {
  storeManagers: any = {};
  dataBucket: any = {};
  constructor(
    private api: ApiService,
  ) {}

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
  
  addStoreManager() {}
}
