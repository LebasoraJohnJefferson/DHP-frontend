import { Component, OnInit } from '@angular/core';
import { FamilyProfileService } from '../../shared/services/family-profile.service';
import { HotToastService } from '@ngneat/hot-toast';
import * as FileSaver from 'file-saver';
import { read, utils, writeFile } from 'xlsx';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import moment from 'moment';

@Component({
  selector: 'app-family-profile',
  templateUrl: './family-profile.component.html',
  styleUrl: './family-profile.component.scss'
})
export class FamilyProfileComponent implements OnInit{
  data:any=[];
  cols:any[]=[
  ];
  FPDetails:any;
  importedFamilyProfile: any[] = [];
  selectdata:any;
  createModal:boolean=false;


  constructor(
    private _FPService:FamilyProfileService,
    private toast:HotToastService
  ){

  }

  ngOnInit(): void {
    this.getAllData()
  }


  getAllData(){
    this._FPService.getAllPF().subscribe({
      next:(res:any)=>{
        this.data = res?.data;
        console.log(this.data)
      }
    })
  }

  registerFamiltyProfileCommit(){
    this.getAllData()
    this.createModal = false
  }

  deleteData(id:any){
    const confirmation = confirm("Are you sure, you want to delete this Profile?");
    if(!confirmation) return
    this._FPService.deletePF(id).subscribe({
      next:(res:any)=>{
        this.getAllData()
        this.toast.success(res?.message || 'Successfully Deleted!');
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }


  exportPdf(){
    const aspectRatio = 1.2941;
    const width = 1500;
    const height = width / aspectRatio;
    const doc = new jsPDF('p', 'pt',[height, width]);
    let data:any = []
    let columns = [
      {title:'HH no.',dataKey:'household_no'},
      { title: 'Father', dataKey: 'father' },
      { title: 'Father`s educational attainment', dataKey: 'father_educ_attain' },
      {title:'Father`s occupation',dataKey:'father_occupation'},
      {title:'Mother',dataKey:'mother'},
      {title:'Mother`s educational attainment',dataKey:'mother_educ_attain'},
      {title:'Mother`s occupation',dataKey:'mother_occupation'},
      {title:'No. of HH members',dataKey:'no_household_member'},
      {title:'Food Production Activity',dataKey:'food_prod_act'},
      {title:'Toilet type',dataKey:'toilet_type'},
      {title:'Wather source',dataKey:'water_source'},
      { title: 'Family Planning', dataKey: 'familty_planning' },
      {title:'HH using IFR',dataKey:'using_IFR'},
      {title:'HH using iodized salt',dataKey:'using_iodized_salt'},
      {title:'Mother pregnant',dataKey:'mother_pregnant'},
    ];

    this.data?.map((datails:any)=>{
      const info = datails?.attributes;
      const familty_planning = info.familty_planning ? 'Yes' : 'No'
      const mother_pregnant = info.mother_pregnant ? 'Yes' : 'No'
      const using_iodized_salt = info.using_iodized_salt ? 'Yes' : 'No'
      const using_IFR = info.using_IFR ? 'Yes' : 'No'
      data.push({...info,
        familty_planning:familty_planning,
        mother_pregnant:mother_pregnant,
        using_iodized_salt:using_iodized_salt,
        using_IFR:using_IFR
      })
    })

    autoTable(doc, {
      columns: columns,
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\RHU: Family Profile', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('rhu_family_profile.pdf');
  }

  exportExcel(){
    import('xlsx').then((xlsx) => {
      let filteredAlumni  = this.data.map((FP:any)=>{
        const {mother_pregnant,familty_planning,using_IFR,using_iodized_salt, ...rest } = FP?.attributes;

        return {
          "mother_pregnant":mother_pregnant ? 'yes' : 'no',
          "familty_planning":familty_planning ? 'yes' : 'no',
          "using_IFR":using_IFR ? 'yes' : 'no',
          "using_iodized_salt":using_iodized_salt ? 'yes' : 'no',
          ...rest
        };
      })
      const worksheet = xlsx.utils.json_to_sheet(filteredAlumni );
      const workbook = { Sheets: { data: worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, {
        bookType: 'xlsx',
        type: 'array',
      });
      this.saveAsExcelFile(excelBuffer, 'rhu_family_profile_data');
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
          this.importedFamilyProfile = rows;

          this.importFamilyProfile();
        }
      };
      reader.readAsArrayBuffer(file);
    }
  }

  importFamilyProfile() {
    this._FPService.saveImportedFamilyProfile({ familiesData: this.importedFamilyProfile }).subscribe({
      next:(res:any)=>{
        setTimeout(() => {
          console.log(res)
          this.toast.success("Successfully Imported!");
          this.getAllData();
        }, 5000);
      },error:(err:any)=>{
        this.toast.error(err.error.message || 'Error occurred');
      }
    })
  }


  familyProfileFormBtn(data:any){
    this.createModal = true
    this.FPDetails = data ;
  }




}
