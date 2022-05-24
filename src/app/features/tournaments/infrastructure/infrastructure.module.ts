import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TournamentMapper } from './tournament/tournament.mapper';
import { TournamentAdapter } from '../adapters/tournament.adapter';
import { TournamentService } from './tournament/tournament.service';
import { InfrastructureModule as TeamsInfrastructureModule } from "../../teams/infrastructure/infrastructure.module";
import { MatchMapper } from './tournament/match.mapper';
import { ScoreMapper } from './tournament/score.mapper';
import { FixtureMapper } from './tournament/fixture.mapper';
import { FixtureStageMapper } from './tournament/fixture-stage.mapper';
import { GroupMapper } from './tournament/group.mapper';
import { PlayerFormMapper } from './tournament/player-form.mapper';
import { StadisticsMapper } from './tournament/stadistics.mapper';


@NgModule({
  declarations: [],
  providers:[
    TournamentMapper,
    MatchMapper,
    FixtureMapper,
    FixtureStageMapper,
    GroupMapper,
    ScoreMapper,
    PlayerFormMapper,
    StadisticsMapper,
    {
      provide: TournamentAdapter,
      useClass: TournamentService
    }
  ],
  imports: [
    CommonModule,
    TeamsInfrastructureModule 
  ]
})
export class InfrastructureModule { }
