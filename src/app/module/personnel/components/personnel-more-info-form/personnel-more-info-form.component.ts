import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { PersonnelService } from '../../shared/services/personnel.service';

@Component({
  selector: 'app-personnel-more-info-form',
  templateUrl: './personnel-more-info-form.component.html',
  styleUrl: './personnel-more-info-form.component.scss'
})
export class PersonnelMoreInfoFormComponent implements OnInit {
  @Output() triggerUpdate:EventEmitter<any> = new EventEmitter();
  modalData:any=[];
  @Input() image:any;
  previewImg:any;
  defaultImg:string='../../../../../assets/images/nurse.png'


  isSubmitLoading:boolean = false
  updateForm:FormGroup = this._fb.group({
    address:['',[Validators.required]],
    birthday:['',[Validators.required]],
    gender:['',[Validators.required]],
    contact_number:['', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    emergency_contact_relationship:['',[Validators.required]],
    emergency_contact_number:['', [Validators.required, Validators.pattern(/^(09|\+639)\d{9}$/)]],
    image:[''],
  })

  fields:any=[
    {
      label:'Address',
      formControl:'address',
      type:'text'
    },
    {
      label:'Birth Day',
      formControl:'birthday',
      type:'date'
    },
    {
      label:'Contact Number',
      formControl:'contact_number',
      type:'number'
    },
    {
      label:'Emergency Contact Number',
      formControl:'emergency_contact_number',
      type:'number'
    }
  ]

  ngOnInit(): void {

  }

  ngOnChanges(){
    this.previewImg = this.image
  }



  dropDownField:any=[
    {
      label:'Emergency Contact`s relationship',
      placeholder:'Relationship',
      formControl:'emergency_contact_relationship',
      options:[
        'Father','Mother','Grandmother','Grandfather',
        'Brother','Sister','Son','Daughter','Aunt','Uncle',
        'Father-in-law','Mother-in-law','Brother-in-law',
        'Sister-in-law','Son-in-law','Daugter-in-law',
        'Nephew','Niece','Great-Grandfather','Great-Grandmother',
        'Great-Grandson','Great-Granddaughter','Friend'
      ]
    },
    {
      label:'Gender',
      placeholder:'Gender',
      formControl:'gender',
      options:['male','female']
    }
  ]



  constructor(
    private _fb:FormBuilder,
    public toast:HotToastService,
    private _personnelService:PersonnelService
  ){}


  updateInfo(){
    if(this.updateForm.controls['contact_number'].invalid) return this.toast.warning("Invalid contact number")
    if(this.updateForm.controls['emergency_contact_number'].invalid) return this.toast.warning("Invalid emergancy contact number")
    if(this.updateForm.valid){
      this.isSubmitLoading = true
      if(this.modalData.image) this.updateForm.controls['image'].setValue(this.modalData.image)
      this._personnelService.updateMoreInformationOfPersonnel(this.updateForm.value).subscribe({
        next:(res:any)=>{
          this.isSubmitLoading = false
          this.triggerUpdate.emit()
          this.updateForm.reset()
          this.toast.success(res?.message || 'Successfull updated')

        },error:(err)=>{
          this.isSubmitLoading = false
          this.toast.warning(err?.error?.message || 'An error occurred')
        }
      })
    }else{
      this.toast.warning("Please, fill-up all inputs")
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
