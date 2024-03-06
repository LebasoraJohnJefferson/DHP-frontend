import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styleUrl: './forms.component.scss'
})
export class FormsComponent {
  forms = [
    {link:'/admin/forms',label:'Family profile'},
    {link:'/admin/forms/infant',label:'Infant'},
    {link:'/admin/forms/baranggay-preschooler',label:'Barangay preschooler'},
    {link:'/admin/forms/list-of-preschooler-with-nutritional-status',label:'Preschooler with nutritional status'},
    {link:'/admin/forms/at-risk-preschool',label:'Affected/at risk preschool'}
  ]


  selectedMonthRange:any;
  selectedHeader:string | undefined='Family Profile';

  listOfTitle:any={
    'infant':'Infant',
    'baranggay-preschooler':'Barangay Preschool',
    'list-of-preschooler-with-nutritional-status':'List of Preschool',
    'at-risk-preschool':'Affected/At Risk'
  }

  selectedRangedOfMonth:any;

  rangeOfMonth:any={
    'infant':' (0-23 months old)',
    'baranggay-preschooler':'Barangay Preschool (3-5 years old)',
    'list-of-preschooler-with-nutritional-status':'(Identified nutritional status)',
    'at-risk-preschool':'Affected/At Risk  (0-59 months old)'
  }

  


  constructor(
    public router:Router,
    public route: ActivatedRoute
  ){

  }

  ngDoCheck(): void{
    const route = this.route.snapshot.children[0].routeConfig?.path
    if(route){
      this.selectedHeader = this.listOfTitle[route];
      this.selectedMonthRange = this.rangeOfMonth[route];
    } 
    else{
      this.selectedMonthRange = '';
      this.selectedHeader = 'Family Profile'
    }
  }

  navigateTo(link:any){
    this.router.navigate([link?.target?.value])
  }


}
