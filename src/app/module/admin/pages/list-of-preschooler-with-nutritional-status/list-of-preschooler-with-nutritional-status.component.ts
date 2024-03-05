import { Component } from '@angular/core';
import { PreschoolerWithNutritionalStatusService } from '../../shared/services/preschooler-with-nutritional-status.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

@Component({
  selector: 'app-list-of-preschooler-with-nutritional-status',
  templateUrl: './list-of-preschooler-with-nutritional-status.component.html',
  styleUrl: './list-of-preschooler-with-nutritional-status.component.scss'
})
export class ListOfPreschoolerWithNutritionalStatusComponent {

  selectdata:any;
  data:any;
  cols:any;
  createModal:any;

  constructor(
    public toast:HotToastService,
    private _PWNSService:PreschoolerWithNutritionalStatusService,
  ){
    this.getAllData();
  }

  deleteData(preschoolerId:any){
    const confirmation = confirm("Are you sure, you want to delete this record?");
    if(!confirmation) return
    this._PWNSService.deletePreschool(preschoolerId).subscribe({
      next:(res:any)=>{
        this.toast.success(res?.message || 'Successfully deleted')
        this.getAllData();
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }


  getAllData(){
    this._PWNSService.getPreschool().subscribe({
      next:(res:any)=>{
        this.data = res?.data
        console.log(this.data)
      }
    })
  }


  createInfantRecordCommit(){
    this.getAllData();
    this.createModal = false
  }

  exportPdf(){
    const aspectRatio = 1.2941;
    const width = 1400;
    const height = width / aspectRatio;
    const doc = new jsPDF('p', 'pt',[height, width]);
    let data:any = []
    let columns = [
      {title:'First name',dataKey:'first_name'},
      {title:'Middle name',dataKey:'middle_name'},
      {title:'Last name',dataKey:'last_name'},
      {title:'Suffix',dataKey:'suffix'},
      {title:'Age', dataKey:'age'},
      {title:'Date of opt plus',dataKey:'optPlus'},
      {title:'Actual date of weight',dataKey:'actDateWeight'},
      {title:'Weight (kg)',dataKey:'weight'},
      {title:'height (cm)',dataKey:'height'},
      {title:'BMI (Body max Index)',dataKey:'BMI'},
      {title:'Percentile for BMI',dataKey:'percentile'},
      {title:'Nutritional Status',dataKey:'status'},
    ];

    

    this.data?.map((details:any)=>{
      
      data.push({...details,
        actDateWeight:this.birthDayFormat(details.created_at),
        height:details?.preDetails?.height,
        weight:details?.preDetails?.weight,
        optPlus:this.birthDayFormat(details?.preDetails?.date_opt),
      })
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\RHU: Preschooler with nutritional status', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('Preschooler_with_nutritional_status.pdf');
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((details:any)=>{

        return {
          first_name:details?.first_name,
          middle_name:details?.middle_name,
          last_name:details?.last_name,
          suffix:details?.suffix,
          actDateWeight:this.birthDayFormat(details.created_at),
          height:details?.preDetails?.height,
          weight:details?.preDetails?.weight,
          optPlus:this.birthDayFormat(details?.preDetails?.date_opt),
          
          age:details?.age,
          BMI:details?.BMI,
          percentile:details?.percentile,
          status:details?.status
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'Preschooler_with_nutritional_status');
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
