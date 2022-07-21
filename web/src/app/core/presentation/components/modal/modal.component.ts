import { Component, Inject, Input, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
})
export class ModalComponent implements OnInit {
  @Input() kind = 'loading';
  @Input() title = '';
  @Input() text = '';
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    if (this.data) {

      this.kind = this.data['kind'];
      this.title = this.data['title'];
      this.text = this.data['text'];
    }
  }
}
