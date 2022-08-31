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
    console.log(formData.get('uploaded_file'), formData.get('name'))

    // this.uploadService.uploadImage(formData).subscribe(
    //   res => console.log(res),
    //   err => console.log(err)
    // )
  }
}
