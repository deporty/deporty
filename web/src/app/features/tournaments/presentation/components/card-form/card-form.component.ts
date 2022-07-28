import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ICardSpecification } from '@deporty/entities/tournaments';

export interface CardSpecification {
  cards: ICardSpecification[];
  total: number;
}

@Component({
  selector: 'app-card-form',
  templateUrl: './card-form.component.html',
  styleUrls: ['./card-form.component.scss'],
})
export class CardFormComponent implements OnInit {
  @Input() title!: string;
  @Input() tag!: string;

  @Input('total-cards') totalCards: number;
  @Input('card-specifications') cardSpecifications: ICardSpecification[];

  @Output() onChange!: EventEmitter<CardSpecification>;
  minuteCard!: number;

  isChecked = false;

  constructor() {
    this.onChange = new EventEmitter<CardSpecification>();
    this.totalCards = 0;
    this.cardSpecifications = []
  }

  ngOnInit(): void {}

  emitData() {
    this.onChange.emit({
      total: this.totalCards,
      cards: this.cardSpecifications,
    });
  }

  onChangeTotalCards() {
    this.emitData();
  }
}
