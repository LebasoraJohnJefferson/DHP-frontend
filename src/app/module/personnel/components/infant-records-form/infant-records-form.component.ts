import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-infant-records-form',
  templateUrl: './infant-records-form.component.html',
  styleUrl: './infant-records-form.component.scss'
})
export class InfantRecordsFormComponent {
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter();
  isSubmitLoading:boolean = false
  children:any;
  otherFileds:any=[
    {
      title:'Weight',
      formName:'weight',
      type:'number',
      placeholder:'Enter weight'
    },
  ]


  infantForm:FormGroup = this._fb.group({

  })

  constructor(
    private _fb:FormBuilder
  ){}



  onSubmit(){

  }

}
