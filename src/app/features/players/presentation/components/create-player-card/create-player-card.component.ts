import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IPlayerModel } from '../../../models/player.model';

@Component({
  selector: 'app-create-player-card',
  templateUrl: './create-player-card.component.html',
  styleUrls: ['./create-player-card.component.scss'],
})
export class CreatePlayerCardComponent implements OnInit {
  formGroup: FormGroup;

  @Output() onCreatePlayer: EventEmitter<any>;
  file!: File;
  fileUrl!: string;
  constructor() {
    this.onCreatePlayer = new EventEmitter();
    this.formGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      id: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      image: new FormControl(''),
    });
  }

  ngOnInit(): void {}

  onSelectedFile(event: any) {
    this.file = event.file;
    this.fileUrl = event.url;
    this.formGroup.get('image')?.setValue(this.fileUrl);
  }
  createPlayer() {
    const value: IPlayerModel = this.formGroup.value;
    const isValid = this.formGroup.valid;
    if (isValid) {
      this.onCreatePlayer.emit({ playerData: value, img: this.file });
    }
  }
}
