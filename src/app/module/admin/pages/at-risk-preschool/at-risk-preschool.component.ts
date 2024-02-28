import { Component } from '@angular/core';
import { AtRiskPreschoolService } from '../../shared/services/atRiskPreschool.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

@Component({
  selector: 'app-at-risk-preschool',
  templateUrl: './at-risk-preschool.component.html',
  styleUrl: './at-risk-preschool.component.scss'
})
export class AtRiskPreschoolComponent {
  selectdata:any;
  cols:any;
  data:any;
  createModal:boolean = false

  constructor(
    private _preschoolAtRiskService:AtRiskPreschoolService,
    public toast:HotToastService
  ){
    this.getAllPrechoolWithRisk()
  }


  getAllPrechoolWithRisk(){
    this._preschoolAtRiskService.getAllCreatedPreschoolAtRisk().subscribe({
      next:(res:any)=>{
        this.data = res?.data
        console.log(this.data)
      }
    })
  }



  deleteData(riskId:any){
    const confirmation = confirm('Are you sure, you want to delete this record?')
    if(!confirmation) return
    this._preschoolAtRiskService.deletePreschoolAtRiskRecord(riskId).subscribe({
      next:(res:any)=>{
        this.toast.success(res?.message || 'Successfully Deleted')
        this.getAllPrechoolWithRisk()
      },error:(err:any)=>{
        this.toast.warning(err?.error?.messaeg || 'An error occurred');
      }
    })
  }

  registerFamiltyProfileCommit(){
    this.getAllPrechoolWithRisk()
    this.createModal = false
  }

  exportPdf(){
    const doc = new jsPDF('p', 'pt');
    let data:any = []
    let columns = [
      {title:'First name',dataKey:'first_name'},
      {title:'Middle name',dataKey:'middle_name'},
      {title:'Last name',dataKey:'last_name'},
      {title:'Suffix',dataKey:'suffix'},
      {title:'Year/Period of measurement',dataKey:'period_of_measurement'},
      {title:'Actual date of weighting',dataKey:'created_at'},
      {title:'Weight (Kg)',dataKey:'weight'},
      {title:'Height (cm)',dataKey:'height'},
    ];

    this.data?.map((details:any)=>{
      
    
      data.push({
        ...details,
        created_at:this.birthDayFormat(details.created_at)
      })
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\BRU: Family Profile`s at risk preschool', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('rhu_at_risk_preschool.pdf');
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((atRisk:any)=>{

        return {
          first_name:atRisk?.first_name,
          middle_name:atRisk?.middle_name,
          last_name:atRisk?.last_name,
          suffix:atRisk?.suffix,
          period_of_measurement:atRisk?.period_of_measurement,
          actual_date_of_weighting:this.birthDayFormat(atRisk.created_at),
          weight:atRisk?.weight,
          height:atRisk.height
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'rhu_at_risk_data');
    });
  }

  saveAsExcelFile(buffer: any, fileName: string){
    let EXCEL_TYPE =
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE,
    });
    FileSaver.saveAs(
      data,
      fileName +
        '_export_' +
        new Date().getTime() +
        EXCEL_EXTENSION
    );

  }

  birthDayFormat(date: any) {
    return moment(date).format('MMMM DD, YYYY');
  }
}
