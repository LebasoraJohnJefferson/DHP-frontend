import { Component} from '@angular/core';
import { InfantService } from '../../shared/services/infant.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

@Component({
  selector: 'app-infant',
  templateUrl: './infant.component.html',
  styleUrl: './infant.component.scss'
})
export class InfantComponent {
  data:any=[];
  cols:any;
  selectdata:any;
  createModal:boolean = false

  constructor(
    private _infantService:InfantService,
    public toast:HotToastService
  ){
    this.getAllInfantRecord()
  }



  deleteData(infantId:any){
    const confirmation = confirm('Are you sure, you want to delete this record?')
    if(!confirmation) return
    this._infantService.deleteInfantRecord(infantId).subscribe({
      next:(res:any)=>{
        this.getAllInfantRecord()
        this.toast.success(res?.message || 'successfully deleted')
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }

  getAllInfantRecord(){
    this._infantService.getAllInfantRecords().subscribe({
      next:(res:any)=>{
        this.data = res?.data
      }
    })
  }


  createInfantRecordCommit(){
    this.getAllInfantRecord()
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
      {title:'Middle name ',dataKey:'middle_name'},
      {title:'Last name',dataKey:'last_name'},
      {title:'Suffix',dataKey:'suffix'},
      {title:'Age',dataKey:'ageInMonth'},
      {title:'Weight',dataKey:'weight'},
      {title:'Weight Status',dataKey:'status'},
    ];

    this.data?.map((details:any)=>{
      
    
      data.push({
        first_name:details?.info?.f_p_m?.first_name,
        middle_name:details?.info?.f_p_m?.middle_name,
        last_name:details?.info?.f_p_m?.last_name,
        suffix:details?.info?.f_p_m?.suffix,
        ageInMonth:details?.ageInMoth,
        weight:details?.info?.weight,
        status:details?.status
      })
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\RHU: Family Profile`s Infant', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('rhu_infant.pdf');
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((infant:any)=>{

        return {
          first_name:infant?.info?.f_p_m?.first_name,
          middle_name:infant?.info?.f_p_m?.middle_name,
          last_name:infant?.info?.f_p_m?.last_name,
          suffix:infant?.info?.f_p_m?.suffix,
          ageInMonth:infant?.ageInMoth,
          weight:infant?.info?.weight,
          status:infant?.status
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'rhu_infant_data');
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
