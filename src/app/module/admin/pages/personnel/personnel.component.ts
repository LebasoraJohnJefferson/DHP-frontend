import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../shared/services/personnel.service';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent {

  selectPersonnel:any;
  createAccountModal:boolean = false
  isSubmitLoading:boolean = false
  importedPersonnel: any[] = [];
  data:any = []


  createForm:FormGroup = this._fb.group({
    first_name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    middle_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    is_active:[false],
    password:['',[Validators.required]],
    password_confirmation:['']
  })


  
  pages:number[] = [1,3,4,5,6,7]

  cols: any[] = [];

  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _personnelService:PersonnelService
  ){
    this.getAllPersonnel()
  }

  getAllPersonnel(){
    this._personnelService.getAllPersonnel().subscribe({
      next:(res)=>{
        this.data = res.data
      },error:(err)=>{

      }
    })
  }


  onSubmit(){
    this.isSubmitLoading = true


    if(this.createForm.controls['email'].invalid){
      this.toast.warning("Invalid Email")
      this.isSubmitLoading = false
      return
    }


    if(this.createForm.invalid){
      this.toast.warning("Please, fill-up all inputs")
      this.isSubmitLoading = false
      return
    }
    this.createForm.controls['password_confirmation'].setValue(
      this.createForm.controls['password'].value
    )
    this._personnelService.createPersonnel(this.createForm.value).subscribe({
      next:(res)=>{
        this.toast.success("Personnel successfully Added!")
        this.isSubmitLoading=false
        this.createAccountModal = false
        this.getAllPersonnel()
        this.createForm.reset()
      },error:(err)=>{
        this.toast.warning(err.error.message || "An Error Occurred")
        this.isSubmitLoading = false
      }
    })

  }

  handleImport($event: any) {
    const files = $event.target.files;

    if (files.length) {
      const file = files[0];
      const reader = new FileReader();

      reader.onload = (event: any) => {
        const wb = read(event.target.result);
        const sheets = wb.SheetNames;

        if (sheets.length) {
          const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          this.importedPersonnel = rows;

          this.importStudents();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importStudents() {
    this._personnelService.importPersonnel({ personnel: this.importedPersonnel }).subscribe({
      next:(res:any)=>{
        setTimeout(() => {
          console.log(res)
          this.toast.success("Successfully Imported!");
          this.getAllPersonnel();
        }, 5000);
      },error:(err:any)=>{
        this.toast.error(err.error.message || 'Error occurred');
      }
    })
  }


  retrieve(){

  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((personnel:any)=>{
        const { first_name, middle_name, last_name, email,is_active, ...rest } = personnel;
        return {
          "first_name":first_name,
          "middle_name":middle_name,
          "last_name":last_name,
          "email":email,
          "is_active":is_active,
          ...rest
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'rhu_personnel_data');
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


  exportPdf() {
    const doc = new jsPDF('p', 'pt');
    let data:any = []
    let columns = [
      { title: 'First Name', dataKey: 'first_name' },
      { title: 'Middle name', dataKey: 'middle_name' },
      { title: 'Last Name', dataKey: 'last_name' },
      { title: 'Email', dataKey: 'email' },
      {title:'Status',dataKey:'is_active'}
    ];

    this.data.map((info:any)=>{
      let active = info.is_active ? 'active' : 'Inactive'
      data.push({...info,is_active:active})
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\nIntel Alley: Alumni', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('IntelAlley_Alumni.pdf');
  }


  


}
