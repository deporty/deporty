import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-new-preview',
  templateUrl: './new-preview.component.html',
  styleUrls: ['./new-preview.component.scss'],
})
export class NewPreviewComponent implements OnInit {
  data: any;
  @Input() new: any;
  constructor() {}

  ngOnInit(): void {
    this.data = this.new;
  }
}
