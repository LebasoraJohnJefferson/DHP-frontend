import { Component, OnInit } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { FileService } from '../../shared/services/file.service';
import { ActivatedRoute } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';


@Component({
  selector: 'app-all-documents',
  templateUrl: './all-documents.component.html',
  styleUrl: './all-documents.component.scss'
})
export class AllDocumentsComponent implements OnInit {
  filesOwner:any=[];
  recoverFiles:any=[];
  documents:any=[];
  fileModel:boolean = false
  ownerId:any;
  baseUrl:any = environment.baseURL
  constructor(
    private _fileService:FileService,
    private _route:ActivatedRoute,
    public toast:HotToastService
  ){
  }

  ngOnInit(): void {
    this._route.paramMap.subscribe(params => {
      this.ownerId = params.get('ownerId');
      this.getAllFiles()
      this.archiveFiles()
    });
  }

  archiveFiles(){
    this._fileService.getArchiveFiles(this.ownerId).subscribe({
      next:(res)=>{
        this.recoverFiles  = res?.data
        console.log(res?.data)
      }
    })
  }


  getAllFiles(){
    this._fileService.getFiles(this.ownerId).subscribe({
      next:(res:any)=>{
        this.documents = res?.data
      }
    })
  }

  recoverFile(fileId:any){
    const confirmation = confirm("Are you sure, you want to recovered this file?")
    if(!confirmation) return
    this._fileService.recoverFile(fileId).subscribe({
      next:(res)=>{
        this.toast.success(res?.message || 'Successfully recovered')
        this.getAllFiles()
        this.archiveFiles()
      },
      error:(err)=>{
        this.toast.error(err?.error?.message || 'An error occurred')
      }
    })
  }

  deleteFile(fileId:any){
    const confirmation = confirm("Are you sure, you want to delete this file?")
    if(!confirmation) return
    this._fileService.deleteFile(fileId).subscribe({
      next:(res)=>{
        this.getAllFiles()
        this.archiveFiles()
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

}
