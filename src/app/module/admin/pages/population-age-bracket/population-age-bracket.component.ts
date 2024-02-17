import { Component } from '@angular/core';

@Component({
  selector: 'app-population-age-bracket',
  templateUrl: './population-age-bracket.component.html',
  styleUrl: './population-age-bracket.component.scss'
})
export class PopulationAgeBracketComponent {
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
}
