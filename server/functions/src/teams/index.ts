import * as cors from 'cors';
import * as express from 'express';
import { Container } from '../core/DI';
import { TeamController } from './infrastructure/team.controller';
import { TeamsModulesConfig } from './teams-modules.config';

export function main(container: Container) {
  const app = express();
  app.use(cors());
  TeamsModulesConfig.config(container);
  TeamController.registerEntryPoints(app, container);
  return { app, controller: TeamController.registerEntryPoints };
}
