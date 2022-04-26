import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { ITeamModel } from '../../../models/team.model';
import { GetTeamsUsecase } from '../../../usecases/get-teams/get-teams.usecase';

@Component({
  selector: 'app-teams',
  templateUrl: './teams.component.html',
  styleUrls: ['./teams.component.scss'],
})
export class TeamsComponent implements OnInit {
  static route = 'team-list';
  options: string[];
  routes: any;
  $teams!: Observable<ITeamModel[]>;
  constructor(
    private getTeamsUsecase: GetTeamsUsecase,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.routes = {};
    this.routes['Ver'] = './team';
    this.options = Object.keys(this.routes);
  }

  ngOnInit(): void {
    this.$teams = this.getTeamsUsecase.call();
  }

  receiveSelectedOption(option: string) {
    const route = this.routes[option];
    this.router.navigate([route], {
      relativeTo: this.route,
    });
  }
}
