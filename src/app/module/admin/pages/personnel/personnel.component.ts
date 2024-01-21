import { Component } from '@angular/core';

@Component({
  selector: 'app-personnel',
  templateUrl: './personnel.component.html',
  styleUrl: './personnel.component.scss'
})
export class PersonnelComponent {
  data:any = [
    {
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      status:false
    },
    {
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      status:false
    },{
      first_name:"hello wolrd",
      last_name:"hell world",
      middle_name:"hell world",
      email:"hell_world@gmail.com",
      status:false
    }
  ]

  pages:number[] = [1,3,4,5,6,7]


}
