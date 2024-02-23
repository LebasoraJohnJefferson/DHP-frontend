import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../shared/services/personnel.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrl: './account.component.scss'
})
export class AccountComponent implements OnInit {
  @Output() triggerUpdate:EventEmitter<any> = new EventEmitter();
  @Input() user:any;
  modalData:any=[];
  @Input() image:any;
  previewImg:any;
  defaultImg:string='../../../../../assets/images/admin.png'


  isSubmitLoading:boolean = false
  updateForm:FormGroup = this._fb.group({
    first_name:['',[Validators.required]],
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required]],
    image:[''],
  })

  fields:any=[
    {
      label:'Admin Name',
      formControl:'first_name',
      type:'text',
      placeholder:'Enter admin name'
    },
    {
      label:'Email',
      formControl:'email',
      type:'text',
      placeholder:'Enter email'
    },
    {
      label:'Password',
      formControl:'password',
      type:'text',
      placeholder:'Enter password'
    }
  ]

  ngOnInit(): void {

  }

  ngOnChanges(){
    this.previewImg = this.user?.image
    this.updateForm.controls['first_name'].setValue(this.user?.first_name)
    this.updateForm.controls['email'].setValue(this.user?.email)
  }



  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _personnelService:PersonnelService
  ){}


  updateInfo(){
    if(this.updateForm.controls['email'].invalid) return this.toast.warning("Invalid email")
    if(this.updateForm.valid){
      this.isSubmitLoading =true
      this.updateForm.controls['image'].setValue(this.modalData?.image);
      this._personnelService.updateAdminInfo(this.updateForm.value).subscribe({
        next:(res:any)=>{
          this.triggerUpdate.emit()
          this.isSubmitLoading =false
          this.toast.success(res?.message || 'Successfully updated')
        },error:(err:any)=>{
          this.isSubmitLoading =false
          this.toast.warning(err?.error?.message || 'An error occurred!')
        }
      })
    }else{
      this.toast.warning("Please, fill-up all inputs!")
    }
  }


  loadInputImgToSrc(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.previewImg = reader.result;
      this.modalData.image = reader.result;
    };
  }


}
