import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { UploadService } from './service/upload.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'client';
  selectedFile!: File;
  message: string = ''

  uploadForm!: FormGroup;

  constructor(private fb: FormBuilder, private uploadService: UploadService){}

  ngOnInit(): void {
    this.uploadForm = this.fb.group({
      name: [''],
      uploaded_file: [null]
    })
  }

  onFileChange(event: any){
    this.selectedFile = event.target.files[0]

    this.uploadForm.patchValue({
      uploaded_file: this.selectedFile
    })
  }
  
  submit(){
    let formData = new FormData()
    formData.append('name', this.uploadForm.get('name')?.value)
    formData.append('uploaded_file', this.uploadForm.get('uploaded_file')?.value)

    this.uploadService.uploadImage(formData).subscribe(
      res => {
        console.log(res)
        this.message = res.message

        setTimeout(() => {
          this.message = ''
          this.ngOnInit()
        }, 2000)
      },
      err => {
        console.log(err)
        this.message = err.message
      }
    )
  }
}
