import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HotToastService } from '@ngneat/hot-toast';
import { FileService } from '../../shared/services/file.service';
import { environment } from '../../../../../environments/environment';

@Component({
  selector: 'app-documents',
  templateUrl: './documents.component.html',
  styleUrl: './documents.component.scss'
})
export class DocumentsComponent {
  baseUrl = environment.baseURL;
  file:any;
  documents:any;
  recoverFiles:any = []
  createModal:boolean = false
  fileModel:boolean = false
  isSubmitLoading:boolean = false
  uploadFileForm:FormGroup = this._fb.group(
    {
      name:['',Validators.required],
      file_name:['',Validators.required],
      uploader:[''],
    }
  )

  constructor(
    public toast:HotToastService,
    private _fb:FormBuilder,
    private _fileService:FileService
  ){
    this.getFiles()
    this.archiveFiles()
  }

  archiveFiles(){
    this._fileService.getArchiveFiles().subscribe({
      next:(res)=>{
        this.recoverFiles  = res?.data
      }
    })
  }


  recoverFile(fileId:any){
    const confirmation = confirm('Are you sure, you want to recover this file?')
    if(!confirmation) return
    this._fileService.recoverFile(fileId).subscribe({
      next:(res)=>{
        this.getFiles()
        this.archiveFiles()
        this.toast.success(res?.message || 'Successfully deleted!')
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }

  commitDelete(fileId:any){
    const confirmation = confirm('Are you sure, you want to delete this file permanently?')
    if(!confirmation) return
    this._fileService.commitDelete(fileId).subscribe({
      next:(res)=>{
        this.archiveFiles()
        this.toast.success(res?.message || 'Successfully deleted!')
      },error:(err)=>{
        this.toast.warning(err?.error?.message || 'An error occurred')
      }
    })
  }


  getFiles(){
    this._fileService.getFiles().subscribe({
      next:(res:any)=>{
        this.documents = res.data
      } 
    })
  }

  deleteFile(fileId:any){
    const confirmation = confirm("Are you sure, you want to delete this file?")
    if(!confirmation) return
    this._fileService.deleteFile(fileId).subscribe({
      next:(res:any)=>{
        this.getFiles()
        this.archiveFiles()
        this.toast.success(res?.message || 'Successfully Deleted')
      },error:(err:any)=>{
        this.toast.warning(err?.error?.message || 'An error occurred!')
      }
    })
  }


  onSubmit(){
    if(this.uploadFileForm.valid){
      this.isSubmitLoading = true
      this._fileService.uploadFile(this.uploadFileForm.value).subscribe({
        next:(res:any)=>{
          this.getFiles()
          this.createModal = false
          this.uploadFileForm.reset()
          this.file = null
          this.toast.success(res?.message || 'Successfully uploaded')
          this.isSubmitLoading = false
        },error:(err:any)=>{
          this.isSubmitLoading = false
          this.toast.error(err?.error?.message || 'An error occurred')
        }
      })
      console.log(this.uploadFileForm.value)
    }else{
      this.toast.warning("Please, Fill-up all inputs")
    }
  }




  uploadFile(event: any) {
    const reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);

    reader.onload = () => {
      this.file = reader.result;

      this.uploadFileForm.patchValue({
        file_name: reader.result,
      });
    };
  }



}
