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
      title:'Father`s first name',
      formName:'father_first_name',
    },
    {
      title:'Father`s middle name',
      formName:'father_middle_name',
    },
    {
      title:'Father`s last name',
      formName:'father_last_name',
    },
    {
      title:'Father`s suffix',
      formName:'father_suffix',
    },
    {
      title:'Father`s citizenship',
      formName:'father_citizenship',
    },
    {
      title:'Father`s place of birth',
      formName:'father_place_birth',
    },
    {
      title:'Father`s birthday',
      formName:'father_birthday',
    },
    {
      title:'Mother`s first name',
      formName:'mother_first_name',
    },
    {
      title:'Mother`s middle name',
      formName:'mother_middle_name',
    },
    {
      title:'Mother`s last name',
      formName:'mother_last_name',
    },
    {
      title:'Mother`s birthday',
      formName:'mother_birthday',
    },
    {
      title:'Mother`s citizenship',
      formName:'mother_citizenship',
    },
    {
      title:'Mother`s place of birth',
      formName:'mother_place_birth',
    },

  ]

  residentForm:FormGroup = this._fb.group({
    mother_first_name:['',Validators.required],
    mother_middle_name:['',Validators.required],
    mother_last_name:['',Validators.required],
    father_first_name:['',Validators.required],
    father_middle_name:['',Validators.required],
    father_last_name:['',Validators.required],
    father_suffix:[''],
    father_birthday:['',Validators.required],
    mother_birthday:['',Validators.required],

    mother_citizenship:['',Validators.required],
    mother_place_birth:['',Validators.required],
    father_citizenship:['',Validators.required],
    father_place_birth:['',Validators.required],
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
        this.barangay = res?.data?.brgyDetails?.baranggay
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
      {title:'Household_no',dataKey:'household_no'},
      {title:'Mother first name',dataKey:'mother_first_name'},
      {title:'Mother middle name',dataKey:'mother_middle_name'},
      {title:'Mother last name',dataKey:'mother_last_name'},
      {title:'Mother birth date',dataKey:'mother_birthday'},
      {title:'Mother`s citizenship',dataKey:'mother_citizenship'},
      {title:'Mother`s place of birth',dataKey:'mother_place_birth'},
      {title:'Father first name',dataKey:'father_first_name'},
      {title:'Father middle name',dataKey:'father_middle_name'},
      {title:'Father Last name',dataKey:'father_last_name'},
      {title:'Father suffix',dataKey:'father_suffix'},
      {title:'Father birth date',dataKey:'father_birthday'},
      {title:'Father place of birth',dataKey:'father_place_birth'},
      {title:'Father citizenship',dataKey:'father_citizenship'},

    ];

    

    this.data?.map((details:any)=>{
      
      data.push({...details,
        mother_birthday:this.birthDayFormat(details.mother_birthday),
        father_birthday:this.birthDayFormat(details.father_birthday),
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
      let filteredAlumni  = this.data.map((details:any)=>{

        return {
          household_no:details?.household_no,
          mother_first_name:details?.mother_first_name,
          mother_middle_name:details?.mother_middle_name,
          mother_last_name:details?.mother_last_name,
          mother_birthday:details?.mother_birthday,
          father_first_name:details?.father_first_name,
          father_middle_name:details?.father_middle_name,
          father_last_name:details?.father_last_name,
          father_suffix:details?.father_suffix,
          father_birthday:details?.father_birthday,
          mother_citizenship:details?.mother_citizenship,
          mother_place_birth:details?.mother_place_birth,
          father_citizenship:details?.father_citizenship,
          father_place_birth:details?.father_place_birth,
        };
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

  onSubmit(){
    if(this.residentForm.valid){
      const data:any = [];
      this.importedResident.map((resident:any)=>{
        const {
          mother_first_name,
          mother_middle_name,
          mother_last_name,
          father_first_name,
          father_middle_name,
          father_last_name,
          father_suffix,
          father_birthday,
          mother_birthday,
          mother_citizenship,
          mother_place_birth,
          father_citizenship,
          father_place_birth,
        } = this.residentForm.value

        data.push({
          mother_first_name:resident[mother_first_name],
          mother_middle_name:resident[mother_middle_name],
          mother_last_name:resident[mother_last_name],
          father_first_name:resident[father_first_name],
          father_middle_name:resident[father_middle_name],
          father_last_name:resident[father_last_name],
          father_suffix:resident[father_suffix],
          father_birthday:resident[father_birthday],
          mother_birthday:resident[mother_birthday],
          mother_citizenship:resident[mother_citizenship],
          mother_place_birth:resident[mother_place_birth],
          father_citizenship:resident[father_citizenship],
          father_place_birth:resident[father_place_birth],
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
    console.log(data)
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
