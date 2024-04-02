import { Component, OnInit } from '@angular/core';
import { FamilyProfileService } from '../../shared/services/family-profile.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FamilyProfileMemberService } from '../../shared/services/family-profile-member.service';
import { HotToastService } from '@ngneat/hot-toast';
import { Location } from '@angular/common';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';
import { ResidentService } from '../../shared/services/resident.service';

@Component({
  selector: 'app-family-profile-details',
  templateUrl: './family-profile-details.component.html',
  styleUrl: './family-profile-details.component.scss'
})
export class FamilyProfileDetailsComponent implements OnInit{
  createModal:boolean = false
  detailModal:boolean = false
  isSubmitLoading:boolean = false
  today = new Date();
  importedFamilyProfileMember:any=[]
  selectdata:any;
  FamDetails:any
  fp_id:any;
  data:any;
  residents:any;
  cols:any;
  pfc:any;
  nursingTypes:string[]=['EBF','Mixed feeding','Bottle-fed','Others']
  relationships:string[] = [
    'Father','Mother','Grandmother','Grandfather',
    'Brother','Sister','Son','Daughter','Aunt','Uncle',
    'Father-in-law','Mother-in-law','Brother-in-law',
    'Sister-in-law','Son-in-law','Daugter-in-law',
    'Nephew','Niece','Great-Grandfather','Great-Grandmother',
    'Great-Grandson','Great-Granddaughter','Friend'
  ]
  occupations:string[]=['employed','unemployed','self-employed']
  constructor(
    private _FP:FamilyProfileService,
    private _route: ActivatedRoute,
    private _residentService:ResidentService,
    private _fb:FormBuilder,
    private _FPCService:FamilyProfileMemberService,
    public toast:HotToastService,
    public location:Location
  ){
  }


  childrenForm:FormGroup = this._fb.group(
    {
      fp_id:[''],
      relationship:['',Validators.required],
      resident_id:['',Validators.required],
      is_nursing:[''],
      nursing_type:['']
    },
  )

  calculateAge(birthDay: Date): number {
    const birthDate = new Date(birthDay);
    let age = this.today.getFullYear() - birthDate.getFullYear();
    // Adjust age if the birthday hasn't occurred yet this year
    if (this.today.getMonth() < birthDate.getMonth() ||
        (this.today.getMonth() === birthDate.getMonth() &&
         this.today.getDate() < birthDate.getDate())) {
        age-=1;
    }

    return age;
  }

  ngOnInit(): void {
    this._route.queryParams.subscribe((value) => {
      this.fp_id = value['pfId'];
      this.getFP()
      this.getAllFPC()
    });
  }


  getFP(){
    this._FP.specificProfileFamilty(this.fp_id).subscribe({
      next:(res:any)=>{
        this.FamDetails = res?.data
      }
    })
  }

  getAllResident(){
    this._residentService.getAllResidentForFamilyMember().subscribe({
      next:(res:any)=>{
        this.residents = res?.data
      },error:(err)=>{
        console.log(err)
      }
    })
  }

  getAllFPC(){
    this._FPCService.getAllPFC(this.fp_id).subscribe((res:any)=>{
      this.data = res?.data
      this.getAllResident()
    })
  }

  deleteData(childId:any){
    const confirmation = confirm('Are you sure, you want to deleted this member?')
    if(!confirmation) return
    this._FPCService.deletePFC(childId).subscribe({
      next:(res:any)=>{
        this.getAllFPC()
        this.toast.success(res?.message || 'Successfully deleted!')
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }

  onSubmit(){
    if(this.childrenForm.valid){
      this.isSubmitLoading =true
      this.childrenForm.controls['fp_id'].setValue(this.fp_id)
      if(this.pfc){
        this.updatePFC()
      }else{
        this.createPFC()
      }
      
    }else{
      this.isSubmitLoading = false
      this.toast.warning("Please, fill-up all inputs")
    }
  }


  updatePFC(){
    this.childrenForm.controls['nursing_type'].setValue(
      this.childrenForm.controls['is_nursing'].value == true ?
      this.childrenForm.controls['nursing_type'].value : null
    )
    this._FPCService.updatePFC(this.pfc?.id,this.childrenForm.value).subscribe({
      next:(res:any)=>{
        this.isSubmitLoading =false
        this.createModal = false
        this.getAllFPC()
        this.toast.success(res?.message || 'Successfully added')
      },error:(err:any)=>{
        this.toast.error(err?.error?.message || 'an error occurred')
        this.isSubmitLoading =false
      }
    })
  }

  createPFC(){
    this._FPCService.createPFC(this.childrenForm.value).subscribe({
      next:(res:any)=>{
        this.isSubmitLoading =false
        this.createModal = false
        this.getAllFPC()
        this.toast.success(res?.message || 'Successfully added')
      },error:(err:any)=>{
        this.toast.error(err?.error?.message || 'an error occurred')
        this.isSubmitLoading =false
      }
    })
  }




  handleSubmit(details:any){
    this.createModal = true
    this.pfc = details
    this.pfc ? this.childrenForm.patchValue({
      ...this.pfc,
      is_nursing:details?.nursing_type != 'N/A' && details!=null && details?.nursing_type!=null,
      nursing_type:details?.nursing_type
    }) : this.childrenForm.reset()
  }

  goBack(){
    this.location.back()
  }


  exportPdf(){
    const aspectRatio = 1.2941;
    const width = 1400;
    const height = width / aspectRatio;
    const doc = new jsPDF('p', 'pt');
    let data:any = []
    let columns = [
      {title:'First name',dataKey:'first_name'},
      {title:'Middle name',dataKey:'middle_name'},
      {title:'Last name',dataKey:'last_name'},
      {title:'Suffix',dataKey:'suffix'},
      {title:'Birthday',dataKey:'birthDay'},
      {title:'Gender',dataKey:'gender'},
      {title:'Nursing type',dataKey:'nursing_type'},
      {title:'Occupation',dataKey:'occupation'},
      {title:'Relationship',dataKey:'relationship'},
    ];


    this.data?.map((details:any)=>{
      const birthday = this.birthDayFormat(details?.birthDay);

      const nursing_type = details?.nursing_type ?? 'N/A';

      const formattedDetails = {
        ...details,
        birthDay: birthday,
        nursing_type: nursing_type,
      };

      data.push(formattedDetails);
      })

      autoTable(doc, {
        columns: columns,
        body: data,
        didDrawPage: (dataArg:any) => {
          doc.text(`\RHU: Family Profile Member of #${this?.FamDetails?.attributes?.household_no}`, dataArg.settings.margin.top, 10);
        },
      });
    doc.save(`rhu_family_profile_member_#${this?.FamDetails?.attributes?.household_no}.pdf`);

  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((FPC:any)=>{
        const {first_name,middle_name,last_name,suffix,nursing_type,birthDay,gender,name,occupation,relationship, ...rest } = FPC


        const nursing_type_temp = nursing_type ?? 'N/A';
        return {
          gender:gender,
          birthDay:birthDay,
          first_name:first_name,
          middle_name:middle_name,
          last_name:last_name,
          suffix:suffix,
          occupation:occupation,
          relationship:relationship,
          nursing_type:nursing_type_temp,
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, `rhu_family_profile_member_#${this?.FamDetails?.attributes?.household_no}`);
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
          this.importedFamilyProfileMember = rows;

          this.importFamilyProfileMember();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importFamilyProfileMember() {
    this._FPCService.saveImportedFCM(this.fp_id,{ familiesMemberData: this.importedFamilyProfileMember }).subscribe({
      next:(res:any)=>{
        setTimeout(() => {
          this.toast.success("Successfully Imported!");
          this.getAllFPC();
        }, 5000);
      },error:(err:any)=>{
        this.toast.error(err?.error?.message || 'Error occurred');
      }
    })
  }

  birthDayFormat(date: any) {
    return moment(date).format('MMMM DD, YYYY');
  }

}
