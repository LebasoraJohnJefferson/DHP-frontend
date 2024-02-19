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
    const aspectRatio = 1.2941;  // Aspect ratio of A4 paper
    const width = 1500;         // Desired width

    // Calculate height based on the aspect ratio
    const height = width / aspectRatio;


    const doc = new jsPDF(
      'l',
      'pt',
      [height, width]
    );
    let data:any = []
    let columns = [
      { title: 'Baranggay', dataKey: 'brgy' },
      {title:'Under 1 (0-1 mons)' , dataKey:'under_1_mons'},
      {title:'1 year old (12-23 mons)' , dataKey:'mons_12_23'},
      {title:'(0-6 mons)' , dataKey:'mons_0_6'},
      { title: '(6-10 mons)', dataKey:''},
      { title: '(0-12 mons)', dataKey:''},
      { title: '(13-23 mons)', dataKey:''},
      { title: '(0-59 mons)', dataKey:''},
      { title: '(1-4) years', dataKey:''},
      { title: '(5-9) years', dataKey:''},
      { title: '(5-11) years', dataKey:''},
      { title: '(10-14) years', dataKey:''},
      { title: '(10-19) years', dataKey:''},
      { title: '(15-19) years', dataKey:''},
      { title: '(5 years and up)', dataKey:''},
      { title: '(12-59) years', dataKey:''},
      { title: '(20-59) years', dataKey:''},
      { title: '(20 years and UP)', dataKey:''},
      { title: '(60 years and UP)', dataKey:''},
    ];

    const expected_age_range = [
      ['under', 0],
      [12, 23],
      [0, 6],
      [6, 10],
      [0, 12],
      [13, 23],
      [0, 59],
      [12, 48],
      [60, 108],
      [60, 132],
      [120, 168],
      [120, 228],
      [180, 228],
      ['above', 60],
      [144, 708],
      [240, 708],
      ['above', 240],
      ['above', 720],
    ];

    this.data.map((info:any)=>{
      data.push({
        brgy:info.brgy,
        under_1_mons:` ${info.genderPopulation[0]['male']} | ${info.genderPopulation[0]['female']} | ${info.genderPopulation[0]['female']+info.genderPopulation[0]['male']}`,
        mons_12_23:` ${info.genderPopulation[1]['male']} | ${info.genderPopulation[1]['female']} | ${info.genderPopulation[1]['female']+info.genderPopulation[1]['male']}`,
        mons_0_6:` ${info.genderPopulation[2]['male']} | ${info.genderPopulation[2]['female']} | ${info.genderPopulation[2]['female']+info.genderPopulation[1]['male']}`,
      })
    })

    const generateSubCol = []

    for(let i=0; i<expected_age_range.length; i++){
      generateSubCol.push({content:['M','F','T']})
    }


    autoTable(doc, {
      head:[
        [
          { content: 'Baranggay', rowSpan: 2, styles: { halign: 'center' }},
          { content: 'Under 1 (0-1 mons)', styles: { halign: 'center' }},
          { content: '1 year old (12-23 mons)', styles: { halign: 'center' }},
          { content: '(0-6 mons)', styles: { halign: 'center' }},
          { content: '(6-10 mons)', styles: { halign: 'center' }},
          { content: '(0-12 mons)', styles: { halign: 'center' }},
          { content: '(13-23 mons)', styles: { halign: 'center' }},
          { content: '(0-59 mons)', styles: { halign: 'center' }},
          { content: '(1-4) years', styles: { halign: 'center' }},
          { content: '(5-9) years', styles: { halign: 'center' }},
          { content: '(5-11) years', styles: { halign: 'center' }},
          { content: '(10-14) years', styles: { halign: 'center' }},
          { content: '(10-19) years', styles: { halign: 'center' }},
          { content: '(15-19) years', styles: { halign: 'center' }},
          { content: '(5 years and up)', styles: { halign: 'center' }},
          { content: '(12-59) years', styles: { halign: 'center' }},
          { content: '(20-59) years', styles: { halign: 'center' }},
          { content: '(20 years and UP)', styles: { halign: 'center' }},
          { content: '(60 years and UP)', styles: { halign: 'center' }},
        ],
        generateSubCol
      ],


      columns:columns,
      columnStyles: {
        0: { halign: 'center', fillColor: [170, 246, 124] },
      },
      body: data,
      didDrawPage: (dataArg:any) => {
        doc.text('\BRU: Pupolation Age Bracket', dataArg.settings.margin.top, 10);
      },
    });
    doc.save('rhu_population.pdf');
  }



}
