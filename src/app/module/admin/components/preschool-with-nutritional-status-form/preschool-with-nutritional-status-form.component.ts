import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PreschoolerWithNutritionalStatusService } from '../../shared/services/preschooler-with-nutritional-status.service';
import { PreschoolService } from '../../shared/services/preschool.service';

@Component({
  selector: 'app-preschool-with-nutritional-status-form',
  templateUrl: './preschool-with-nutritional-status-form.component.html',
  styleUrl: './preschool-with-nutritional-status-form.component.scss'
})
export class PreschoolWithNutritionalStatusFormComponent implements OnInit{
  @Output() triggerSubmmit:EventEmitter<any> = new EventEmitter();
  isSubmitLoading:boolean = false
  selectedResident:any=[];
  children:any=[];

  otherFileds:any=[
    {
      title:'Date of OPT plus',
      formName:'date_opt',
      type:'date',
      placeholder:'Enter date of OPT plus'
    },
    {
      title:'Weight (kg)',
      formName:'weight',
      type:'number',
      placeholder:'Enter weight'
    },
    {
      title:'Height (cm)',
      formName:'height',
      type:'number',
      placeholder:'Enter height'
    },
  ];

  preschoolerWithStatusForm:FormGroup = this._fb.group({
    height:['',Validators.required],
    weight:['',Validators.required],
    member_id:['',Validators.required],
    date_opt:['',Validators.required],
  })

  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _PWNSService:PreschoolerWithNutritionalStatusService,
    private _preschool:PreschoolService
  ){}


  ngOnInit(): void {
    this.getAllPreschoolder()
  }

  getResidentsWithName(): any[] {
    return this.children.map((child:any) => ({
        ...child,
        name: `${child.first_name} ${child.middle_name[0]}. ${child.last_name}`
    }));
  }


  getAllPreschoolder(){
    this._preschool.getPreschool().subscribe({
      next:(res:any)=>{
        this.children = res?.data
      }
    })
  }



  onSubmit(){
    if(this.preschoolerWithStatusForm.valid){
      this.isSubmitLoading = true
      this._PWNSService.postPreschool(this.preschoolerWithStatusForm.value).subscribe({
        next:(res:any)=>{
          this.triggerSubmmit.emit()
          this.preschoolerWithStatusForm.reset()
          this.toast.success(res?.message || 'Successfully created')
          this.isSubmitLoading = false
        },error:(error:any)=>{
          this.toast.warning(error?.error?.messaeg || 'An error occurred')
          this.isSubmitLoading = false
        }
      })
    }else{
      this.toast.warning("Please, fill-up all inputs!")
    }
  }


}
