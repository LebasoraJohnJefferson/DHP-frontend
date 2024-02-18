import { Component, OnInit } from '@angular/core';
import  jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import { PopulationBracketService } from '../../shared/services/populationBracket.service';

@Component({
  selector: 'app-population-age-bracket',
  templateUrl: './population-age-bracket.component.html',
  styleUrl: './population-age-bracket.component.scss'
})
export class PopulationAgeBracketComponent implements OnInit{
  data:any = []
  months:any=[
    {label:'Under 1 (0-1 mons)'},
    {label:'1 year old (12-23 mons)'},
    {label:'(0-6 mons)'},
    {label:'(6-10 mons)'},
    {label:'(0-12 mons)'},
    {label:'(13-23 mons)'},
    {label:'(0-59 mons)'},
    {label:'(1-4) years'},
    {label:'(5-9) years'},
    {label:'(5-11) years'},
    {label:'(10-14) years'},
    {label:'(10-19) years'},
    {label:'(15-19) years'},
    {label:'(5 years and up)'},
    {label:'(12-59) years'},
    {label:'(20-59) years'},
    {label:'(20 years and UP)'},
    {label:'(60 years and UP)'},
  ]

  constructor(
    private _PBService:PopulationBracketService
  ){}

    ngOnInit(): void {
      this.getData()
    }


  getData(){
    this._PBService.getData().subscribe({
      next:(res:any)=>{
        this.data  = res?.data
        console.log(res?.data)
      }
    })
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
        doc.text('\BRU: Personnel', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('rhu.pdf');
  }



}
