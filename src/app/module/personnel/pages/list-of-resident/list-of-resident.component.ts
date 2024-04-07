import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { ResidentService } from '../../shared/services/resident.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-list-of-resident',
  templateUrl: './list-of-resident.component.html',
  styleUrl: './list-of-resident.component.scss'
})
export class ListOfResidentComponent implements OnInit{
  barangay:string=''
  baranggayDetails:any
  brgyId:number = 0;
  data:any;
  cols:any
  resident:any;
  selectResident:any;
  createResidentModal:boolean =false;
  importResidentModal:boolean =false;
  isSubmitLoading:boolean =false;
  importedResident:any;
  excelExistingField:any;

  otherFileds:any=[
    {
      title:'First name',
      formName:'first_name',
    },
    {
      title:'Middle name',
      formName:'middle_name',
    },
    {
      title:'Last name',
      formName:'last_name',
    },
    {
      title:'Suffix',
      formName:'suffix',
    },
    {
      title:'Birthday',
      formName:'birthday',
    },
    {
      title:'Gender',
      formName:'sex',
    },
    {
      title:'Occupation',
      formName:'occupation',
    },
    {
      title:'Citizenship',
      formName:'citizenship',
    },
    {
      title:'Civil Status',
      formName:'civil_status',
    },

  ]

  residentForm:FormGroup = this._fb.group({
    sex:['',Validators.required],
    first_name:['',Validators.required],
    citizenship:['',Validators.required],
    middle_name:[''],
    last_name:['',Validators.required],
    civil_status:['',Validators.required],
    occupation:['',Validators.required],
    suffix:[''],
    birthday:['',Validators.required],
  });


  constructor(
    private _residentService:ResidentService,
    public route:ActivatedRoute,
    public toast:HotToastService,
    private _fb:FormBuilder
  ){}


  ngOnInit(): void {
    this.route.queryParams.subscribe((value) => {
      this.brgyId = value['brgyId'];
      this.getAllResident()
    });
  }
  

  getAllResident(){
    this._residentService.getResident(this.brgyId).subscribe({
      next:(res:any)=>{
        console.log(res)
        this.barangay = res?.data?.brgyDetails?.baranggay
        this.baranggayDetails = res?.data?.brgyDetails
        this.data = res?.data?.residents
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  deleteResident(residentId:number){
    const confirmation = confirm("Are you sure, you want to delete this resident?")
    if(!confirmation) return
    this._residentService.deleteResident(residentId).subscribe({
      next:(res)=>{
        this.getAllResident()
        this.toast.success(res?.message || 'Resident successfully deleted')
      },
      error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
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
      {title:'Age',dataKey:'age'},
      {title:'Birthday',dataKey:'birthday'},
      {title:'Civil Status',dataKey:'civil_status'},
      {title:'Gender',dataKey:'sex'},
      {title:'Occupation',dataKey:'occupation'},
      {title:'Citizenship',dataKey:'citizenship'},
      {title:'Date accomplished',dataKey:'created_at'},
      {title:'Address',dataKey:'address'},
      {title:'Household #',dataKey:'household_no'},
    ];

    

    this.data?.map((details:any)=>{
      let address:any;
      if(this.baranggayDetails){
        let {province,city,baranggay,purok} = this.baranggayDetails;
        address = `${province}, ${city}, ${baranggay} ${purok}`
      }
      data.push({
        household_no: details.household_no ? details.household_no : 'N/A',
        ...details,
        address:address ? address : 'N/A',
        birthday:this.birthDayFormat(details.birthday),
        created_at:this.birthDayFormat(details.created_at),
      })
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text(`\RHU: Resident of ${this.barangay}`, dataArg.settings.margin.top, 10);
      },
    });
    doc.save(`Resident_of_${this.barangay}.pdf`);
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let address = 'N/A'
      if(this.baranggayDetails){
        let {province,city,baranggay,purok} = this.baranggayDetails;
        address = `${province}, ${city}, ${baranggay} ${purok}`
      }
      let filteredAlumni  = this.data.map((details:any)=>{
        let { mother_family_profile,father_family_profile,resident_member, updated_at,id,brgy_id, household_no,...rest } = details; 

        return {...rest,address:address,household_no:household_no}
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, `Resident_of_${this.barangay}`);
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

  createResident(){
    this.createResidentModal = true
    this.resident =null
  }

  onSubmit(){
    if(this.residentForm.valid){
      const data:any = [];
      this.importedResident.map((resident:any)=>{
        const {
        first_name,
        middle_name,
        last_name,
        suffix,
        birthday,
        civil_status,
        sex,
        citizenship,
        occupation,
        } = this.residentForm.value
        data.push({
          first_name:resident[first_name],
          citizenship:resident[citizenship],
          middle_name:resident[middle_name],
          last_name:resident[last_name],
          suffix:resident[suffix] ? resident[suffix] : null,
          birthday:resident[birthday],
          civil_status:resident[civil_status],
          sex:resident[sex],
          occupation:resident[occupation],
        })

      })

      this.importResident(data)
    }else{
      this.toast.warning("Empty field")
    }
  }

  updateResident(resident:any){
    this.resident = resident
    this.createResidentModal = true
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
          const rows:any = utils.sheet_to_json(wb.Sheets[sheets[0]]);
          // with existing data
          this.importedResident = rows;
          if(rows.length > 0){
            // existed column from excel
            this.excelExistingField = Object.keys(rows[0])
            if(!this.excelExistingField.includes('suffix')) this.excelExistingField.push('suffix')
            this.importResidentModal = true
          }else{
            this.toast.warning("Empty File")
          }
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importResident(data:any) {
    this.isSubmitLoading = true
    this._residentService.importResident({ resident: data },this.brgyId).subscribe({
      next:(res:any)=>{
        setTimeout(() => {
          this.toast.success("Successfully Imported!");
          this.getAllResident();
          this.isSubmitLoading = false
          this.importResidentModal = false
          this.residentForm.reset()
        }, 5000);
      },error:(err:any)=>{
        this.isSubmitLoading = false
        this.toast.error(err?.error?.message || 'Error occurred');
      }
    })
  }

   birthDayFormat(date: any) {
    return moment(date).format('MMMM DD, YYYY');
  }





}

