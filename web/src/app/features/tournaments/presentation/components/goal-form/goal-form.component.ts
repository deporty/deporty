import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IGoalSpecification } from '@deporty/entities/tournaments';

@Component({
  selector: 'app-goal-form',
  templateUrl: './goal-form.component.html',
  styleUrls: ['./goal-form.component.scss'],
})
export class GoalFormComponent implements OnInit {

  @Input() title!: string;
  @Input() tag!: string;

  @Input('total-goals') totalGoals: number;
  @Input('goal-specifications') goalSpecifications: IGoalSpecification[];

  @Output() onChange!: EventEmitter<any>;

  
  isChecked = false;

  constructor() {
    this.onChange = new EventEmitter<any>();
    this.totalGoals = 0;
    this.goalSpecifications = [];
  }

  ngOnInit(): void {}

  emitData() {
    this.onChange.emit({
      total: this.totalGoals,
      goals: this.goalSpecifications,
    });
  }

  onChangeTotalCards() {
    this.emitData();
  }
}
