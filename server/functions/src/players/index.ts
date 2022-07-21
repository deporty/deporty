import * as cors from 'cors';
import * as express from 'express';
import { Container } from '../core/DI';
import { PlayerController } from './infrastructure/player.controller';
import { PlayersModulesConfig } from './players-modules.config';

export function main(container: Container) {
  const app = express();
  app.use(cors());

  PlayersModulesConfig.config(container);

  PlayerController.registerEntryPoints(app, container);
  return { app, controller: PlayerController.registerEntryPoints };
}
