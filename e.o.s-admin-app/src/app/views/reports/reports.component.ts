import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../../../services/api.service';
import { ExcelService } from '../../../services/excel.service';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {
  dateForm: FormGroup
  monthForm: FormGroup;
  reportDay: string;
  reportMonth: string;
  dailyReports: any = {};
  monthlyReports: any = {};
  dataBucket: any = {};

  constructor(private excelService: ExcelService, private api: ApiService, private formBuilder: FormBuilder) { 
    this.createDateForm();
    this.createMonthForm();
  }

  ngOnInit(): void {
  }

  createDateForm() {
    this.dateForm = this.formBuilder.group({
      reportDay: ['', Validators.required]
    });
  }

  createMonthForm() {
    this.monthForm = this.formBuilder.group({
      reportMonth: ['', Validators.required]
    });
  }

  loadDailyReport() {
    // console.log(this.dateForm.value.reportDay);
    this.reportDay = this.dateForm.value.reportDay;
    console.log(this.reportDay.substring(8, 10))
    this.api.getDailyReports(this.reportDay).subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        this.dailyReports = this.dataBucket.message;
      } else {
        
      }
    })
  }

  downloadDailyReport() {
    this.excelService.exportAsExcelFile(this.dailyReports, 'Sales for ' + this.reportDay.substring(8, 10) + '-' + this.reportDay.substring(5, 7) + '-' + this.reportDay.substring(0, 4));
  }

  loadMonthlyReports() {
    this.reportMonth = this.monthForm.value.reportMonth;
    this.api.getMonthlyReports(this.reportMonth.substring(0, 7)).subscribe(response => {
      console.log(response);
      this.dataBucket = response;
      if (this.dataBucket.status === 200) {
        this.monthlyReports = this.dataBucket.message;
      } else {
        this.ngOnInit();
      }
    })
  }

  downloadMonthlyReport() {
    switch(this.reportMonth.substring(5, 7)){
      case '01':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for January ' + this.reportMonth.substring(0, 4));
        break;

        case '02':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for February ' + this.reportMonth.substring(0, 4));
        break;

        case '03':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for March ' + this.reportMonth.substring(0, 4));
        break;

        case '04':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for April ' + this.reportMonth.substring(0, 4));
        break;

        case '05':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for May ' + this.reportMonth.substring(0, 4));
        break;

        case '06':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for June ' + this.reportMonth.substring(0, 4));
        break;

        case '07':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for July ' + this.reportMonth.substring(0, 4));
        break;

        case '08':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for August ' + this.reportMonth.substring(0, 4));
        break;

        case '09':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for September ' + this.reportMonth.substring(0, 4));
        break;

        case '10':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for October ' + this.reportMonth.substring(0, 4));
        break;

        case '11':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for November ' + this.reportMonth.substring(0, 4));
        break;

        case '12':
        this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for December ' + this.reportMonth.substring(0, 4));
        break;

        default:
          this.excelService.exportAsExcelFile(this.monthlyReports, 'Sales Report for ' + this.reportMonth.substring(0, 4));
    }
  }

}
