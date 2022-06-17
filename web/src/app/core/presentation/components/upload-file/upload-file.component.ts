import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-upload-file',
  templateUrl: './upload-file.component.html',
  styleUrls: ['./upload-file.component.scss'],
})
export class UploadFileComponent implements OnInit, AfterViewInit {
  @Input() text = 'Subir archivo';

  @ViewChild('inputFile', { read: ElementRef })
  uploadComponent!: ElementRef<HTMLDivElement>;

  @Output() onSelectedFile: EventEmitter<any>;

  nameFile!: string;
  file!: File;

  constructor() {
    this.onSelectedFile = new EventEmitter();
  }

  ngOnInit(): void {}

  uploadFile() {
   
  }

  ngAfterViewInit(): void {
    this.addListener();
  }
  addListener() {
    const inputElement: HTMLInputElement = this.uploadComponent
      .nativeElement as HTMLInputElement;

    inputElement.onchange = (event) => {
      var fileList: FileList | null = inputElement.files;
      if (fileList) {
        for (const key in fileList) {
          if (Object.prototype.hasOwnProperty.call(fileList, key)) {
            const element = fileList[key];

            var reader = new FileReader();
            reader.onload = (e: any) => {
              this.onSelectedFile.emit({ file: element, url: e.target.result });
            };
            reader.readAsDataURL(element);

            this.file = element;
            this.nameFile = element.name;
          }
        }
      }
    };
  }
}
