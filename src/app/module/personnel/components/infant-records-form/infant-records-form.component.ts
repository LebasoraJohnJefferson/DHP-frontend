import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { InfantService } from '../../shared/services/infant.service';
import { HotToastService } from '@ngneat/hot-toast';

@Component({
  selector: 'app-infant-records-form',
  templateUrl: './infant-records-form.component.html',
  styleUrl: './infant-records-form.component.scss'
})
export class InfantRecordsFormComponent implements OnInit{
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter();
  isSubmitLoading:boolean = false
  children:any=[];
  otherFileds:any=[
    {
      title:'Weight',
      formName:'weight',
      type:'number',
      placeholder:'Enter weight'
    },
  ]


  infantForm:FormGroup = this._fb.group({
    member_id:['',Validators.required],
    weight:['',Validators.required]
  })

  constructor(
    private _fb:FormBuilder,
    private _infantService:InfantService,
    public toast:HotToastService
  ){}

  ngOnInit():void{
    this.getAllInfant()
  }

  getAllInfant(){
    this._infantService.getInfants().subscribe({
      next:(res)=>{
        this.children = res?.data
      }
    })
  }



  onSubmit(){
    if(this.infantForm.valid){
    this.isSubmitLoading = true
    this._infantService.addInfantWeight(this.infantForm.value).subscribe({
      next:(res)=>{
        this.infantForm.reset()
        this.isSubmitLoading = false
        this.triggerSubmmit.emit()
        this.toast.success(res?.message || "Successfully Added")
      },error:(err)=>{  
        this.isSubmitLoading = false
        this.toast.warning(err?.error?.message || 'An error occured')
      }
    })
    }else{
      this.toast.warning('Please, fill-out all inputs')
    }
  }

}
