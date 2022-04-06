import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { IPlayerModel } from '../../../domain/models/player.model';
import { GetAllSummaryPlayersUsecase } from '../../../domain/usecases/get-all-summary-players/get-all-summary-players.usecase';
import { CreatePlayerComponent } from '../create-player/create-player.component';

@Component({
  selector: 'app-players-summary-list',
  templateUrl: './players-summary-list.component.html',
  styleUrls: ['./players-summary-list.component.scss'],
})
export class PlayersSummaryListComponent implements OnInit {
  static route = 'player-list';
  formGroup: FormGroup;

  players!: Observable<IPlayerModel[]>;
  constructor(
    private getAllSummaryPlayersUsecase: GetAllSummaryPlayersUsecase,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroup = new FormGroup({
      name: new FormControl(''),
      lastName: new FormControl(''),
      id: new FormControl(''),
    });
  }

  createUser() {
    this.router.navigate([CreatePlayerComponent.route], {
      relativeTo: this.route,
    });
  }

  // sortData(sort: Sort) {
  //   const data = this.players.slice();
  //   if (!sort.active || sort.direction === '') {
  //     this.sortedData = data;
  //     return;
  //   }

  //   this.sortedData = data.sort((a, b) => {
  //     const isAsc = sort.direction === 'asc';
  //     switch (sort.active) {
  //       case 'name': return compare(a.name, b.name, isAsc);
  //       case 'calories': return compare(a.calories, b.calories, isAsc);
  //       case 'fat': return compare(a.fat, b.fat, isAsc);
  //       case 'carbs': return compare(a.carbs, b.carbs, isAsc);
  //       case 'protein': return compare(a.protein, b.protein, isAsc);
  //       default: return 0;
  //     }
  //   });
  // }

  ngOnInit(): void {
    this.players = this.getAllSummaryPlayersUsecase.call();
  }
}
