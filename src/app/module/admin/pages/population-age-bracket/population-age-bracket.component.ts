import { Component, OnInit } from '@angular/core';
import  jsPDF from 'jspdf';
import autoTable, { CellInput } from 'jspdf-autotable';
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
      }
    })
  }

  exportPdf() {
    const aspectRatio = 1.2941;  // Aspect ratio of A4 paper
    const width = 1400;         // Desired width

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
      { title: '(6-10 mons)', dataKey:'mons_6_10'},
      { title: '(0-12 mons)', dataKey:'mons_0_12'},
      { title: '(13-23 mons)', dataKey:'mons_13_23'},
      { title: '(0-59 mons)', dataKey:'mons_0_59'},
      { title: '(1-4) years', dataKey:'year_1_4'},
      { title: '(5-9) years', dataKey:'year_5_9'},
      { title: '(5-11) years', dataKey:'year_5_11'},
      { title: '(10-14) years', dataKey:'year_10_14'},
      { title: '(10-19) years', dataKey:'year_10_19'},
      { title: '(15-19) years', dataKey:'year_15_19'},
      { title: '(5 years and up)', dataKey:'year_5_up'},
      { title: '(12-59) years', dataKey:'year_12_59'},
      { title: '(20-59) years', dataKey:'year_20_59'},
      { title: '(20 years and UP)', dataKey:'year_20_up'},
      { title: '(60 years and UP)', dataKey:'year_60_up'},
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

    this.data.map((info: any) => {
      const rowData: any = {};

      columns.forEach((col, index) => {
        if (col.dataKey === 'brgy') {
            rowData[col.dataKey] = { content: info.brgy, styles: { halign: 'center' } };
        } else {
            const genderPopulation = info.genderPopulation[index-1];
            if (genderPopulation && genderPopulation.hasOwnProperty('male') && genderPopulation.hasOwnProperty('female')) {
                rowData[col.dataKey] = {
                    content: [
                        genderPopulation['male'],
                        genderPopulation['female'],
                        genderPopulation['female'] + genderPopulation['male']
                    ].join(' | '),
                    styles: { halign: 'center' }
                };
            } else {
                // Handle the case where genderPopulation[index] is undefined or doesn't have the expected structure
                rowData[col.dataKey] = { content: 'N/A', styles: { halign: 'center' } };
            }
        }
    });

    data.push(rowData);
  })

    const generateSubCol: (CellInput | string)[] = [];

    expected_age_range.forEach((ageRange, index) => {
      generateSubCol.push({ content: ['M', 'F', 'T'].join(' | '), styles: { halign: 'center' } });
    });


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
