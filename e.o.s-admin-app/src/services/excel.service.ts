import { Injectable } from '@angular/core';
import * as FileSaver from 'file-saver';
import * as xlsx from 'xlsx';

const EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
const EXCEL_EXTENTSION = '.xlsx'

@Injectable({
  providedIn: 'root'
})
export class ExcelService {

  constructor() { }

  /**
   * exportAsExcelFile
   * Will download an html page (preferably a table)
   * And save it as an excel file
   */
  public exportAsExcelFile(json: any[], fileName: string): void {
    const myWorkSheet: xlsx.WorkSheet = xlsx.utils.json_to_sheet(json);
    const myWorkBook: xlsx.WorkBook = {Sheets: {'data': myWorkSheet}, SheetNames: ['data']};
    const excelBuffer: any = xlsx.write(myWorkBook, { bookType: 'xlsx', type: 'array'});
    this.saveAsExcelFile(excelBuffer, fileName);
  }

  private saveAsExcelFile(buffer: any, file: string): void {
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, file + '_for EOS-ADMIN' + EXCEL_EXTENTSION);
  }
}
