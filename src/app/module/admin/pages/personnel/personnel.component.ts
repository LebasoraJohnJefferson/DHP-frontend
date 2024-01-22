import { Component } from '@angular/core';
import {FormBuilder, FormGroup,Validators} from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../shared/services/personnel.service';
import * as FileSaver from 'file-saver';
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
  formMethod:string = 'post'
  data:any = [
    {
      id:1,
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      gender:'male',
      is_active:false
    },
    {
      id:2,
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      gender:'male',
      is_active:true
    },{
      id:3,
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      gender:'male',
      is_active:false
    }
  ]


  createForm:FormGroup = this._fb.group({
    first_name:['',[Validators.required]],
    last_name:['',[Validators.required]],
    middle_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    gender:['',[Validators.required]],
    is_active:[false,[Validators.required]],
    password:['',[Validators.required]],
    password_confirmation:['']
  })


  gender:any=[
    {
      id:1,
      name:"male"
    },
    {
      id:2,
      name:"female"
    }
  ];
  pages:number[] = [1,3,4,5,6,7]

  cols: any[] = [];

  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _personnelService:PersonnelService
  ){

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
        this.createForm.reset()
      },error:(err)=>{
        this.toast.warning(err.error.message || "An Error Occurred")
        this.isSubmitLoading = false
      }
    })

  }

  handleImport($event: any) {
    // const files = $event.target.files;

    // if (files.length) {
    //   const file = files[0];
    //   const reader = new FileReader();

    //   reader.onload = (event: any) => {
    //     const wb = read(event.target.result);
    //     const sheets = wb.SheetNames;

    //     if (sheets.length) {
    //       const rows = utils.sheet_to_json(wb.Sheets[sheets[0]]);
    //       this.importedAlumni = rows;

    //       this.importStudents();
    //     }
    //   };
    //   reader.readAsArrayBuffer(file);
    // }
  }


  retrieve(){

  }

  exportExcel(){

  }


  exportPdf() {
    const doc = new jsPDF('p', 'pt');

    let data: any = [];

    let columns = [
      { title: 'Student ID', dataKey: 'studentId' },
      { title: 'Name', dataKey: 'name' },
      { title: 'Email', dataKey: 'email' },

      {title: 'Gender',dataKey:'gender'},
      {title: 'Address',dataKey:'address'},
      {title: 'Organization',dataKey:'organization'},
      {title: 'Position',dataKey:'position'},

      { title: 'Course', dataKey: 'course' },
      { title: 'Year', dataKey: 'year' },
    ];

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\nIntel Alley: Alumni', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('IntelAlley_Alumni.pdf');
  }


  openPersonnelForm(method:string){
    this.formMethod = method
    this.createAccountModal = true
  }

  


}
