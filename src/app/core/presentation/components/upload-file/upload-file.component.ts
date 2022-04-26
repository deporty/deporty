import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit {
  constructor() {}
  @ViewChild('upload', { read: ElementRef })
  uploadComponent!: ElementRef<HTMLDivElement>;

  ngOnInit(): void {}

  uploadFile() {
    // let sleep = (time: number) =>
    //   new Promise((resolve) => setTimeout(resolve, time));
    // let uploadComponent = document.querySelector('.upload');
    this.uploadComponent.nativeElement.classList.add('uploading');
    this.uploadComponent.nativeElement.classList.add('uploaded');
    this.uploadComponent.nativeElement.classList.remove('uploading');
    this.uploadComponent.nativeElement.classList.add('uploaded-after');
    this.uploadComponent.nativeElement.className = 'upload';
  }
}
