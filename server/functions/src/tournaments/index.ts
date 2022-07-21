import * as cors from 'cors';
import * as express from 'express';
import { Container } from '../core/DI';
import { TournamentController } from './infrastructure/tournament.controller';
import { TournamentsModulesConfig } from './tournaments-modules.config';

export function main(container: Container) {
  const app = express();
  app.use(cors());

  TournamentsModulesConfig.config(container);

  TournamentController.registerEntryPoints(app, container);
  return {app, controller: TournamentController.registerEntryPoints};
}
