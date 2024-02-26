import { Component } from '@angular/core';
import { PreschoolService } from '../../shared/services/preschool.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

@Component({
  selector: 'app-baranggay-preschooler',
  templateUrl: './baranggay-preschooler.component.html',
  styleUrl: './baranggay-preschooler.component.scss'
})
export class BaranggayPreschoolerComponent {
  createModal:boolean = false
  data:any;
  cols:any;
  selectdata:any;

  constructor(
    private _preschoolService:PreschoolService,
    public toast:HotToastService
  ){
    this.getAllPreschool()
  }

  deleteData(preschoolId:number){
    const confirmation = confirm("Are you sure, you want to delete this record?")
    if(!confirmation) return
    this._preschoolService.deleteBrgyPreschoollerRecord(preschoolId).subscribe({
      next:(res:any)=>{
        this.getAllPreschool()
        this.toast.success(res?.message || 'Successfully Deleted')
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred!')
      }
    })
  }


  getAllPreschool(){
    this._preschoolService.getAllRegistedPreschool().subscribe({
      next:(res:any)=>{
        this.data = res?.data
      }
    })
  }

  triggerSubmit(){
    this.createModal = false
    this.getAllPreschool()
  }


  exportPdf(){
    const aspectRatio = 1.2941;
    const width = 1400;
    const height = width / aspectRatio;
    const doc = new jsPDF('p', 'pt',[height, width]);
    let data:any = []
    let columns = [
      {title:'Name',dataKey:'name'},
      {title:'Indigenous preschool child', dataKey:'ingigenous'},
      {title:'Address',dataKey:'address'},
      {title:'Actual date of weighing',dataKey:'actDateWeight'},
      {title:'Weight (kg)',dataKey:'weight'},
      {title:'Height (cm)',dataKey:'height'},
    ];

    this.data?.map((details:any)=>{
      
      data.push({...details,
          ingigenous:details?.preDetails?.indigenous_preschool_child ? 'Yes' : 'No',
          address:details?.preDetails?.address,
          actDateWeight:this.birthDayFormat(details?.preDetails?.created_at),
          weight:details?.preDetails.weight,
          height:details?.preDetails.height,
      })
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\BRU: Baranggay preschooler', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('baranggay_preschooler.pdf');
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((details:any)=>{

        return {
          ingigenous:details?.preDetails?.indigenous_preschool_child ? 'Yes' : 'No',
          address:details?.preDetails?.address,
          actDateWeight:this.birthDayFormat(details?.preDetails?.created_at),
          weight:details?.preDetails.weight,
          height:details?.preDetails.height,
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'baranggay_preschooler');
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

