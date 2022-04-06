import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-create-player',
  templateUrl: './create-player.component.html',
  styleUrls: ['./create-player.component.scss'],
})
export class CreatePlayerComponent implements OnInit {
  static route = 'create-player';
  formGroup: FormGroup;

  constructor() {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      id: new FormControl(''),
      lastName: new FormControl(''),
    });
  }

  ngOnInit(): void {}
}
