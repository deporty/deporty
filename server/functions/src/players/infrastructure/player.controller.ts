import { IPlayerModel } from '@deporty/entities/players';
import { Express, Request, Response } from 'express';
import { BaseController } from '../../core/controller/controller';
import { DEPENDENCIES_CONTAINER } from '../modules.config';
import { CreatePlayerUsecase } from '../usecases/create-player/create-player.usecase';
import { DeletePlayerUsecase } from '../usecases/delete-player/delete-player.usecase';
import { GetPlayerByDocumentUsecase } from '../usecases/get-player-by-document/get-player-by-document.usecase';
import { GetPlayersUsecase } from '../usecases/get-players/get-players.usecase';

export class PlayerController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'PLAYER';

  static registerEntryPoints(app: Express) {
    app.get(`/delete/:id`, (request: Request, response: Response) => {
      const id = request.params.id;

      this.handlerController<DeletePlayerUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'DeletePlayerUsecase',
        response,
        undefined,
        id
      );
    });

    app.get(`/`, (request: Request, response: Response) => {
      this.handlerController<GetPlayersUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'GetPlayersUsecase',
        response
      );
    });

    app.get(`/document/:document`, (request: Request, response: Response) => {
      const document = request.params.document;

      this.handlerController<GetPlayerByDocumentUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'GetPlayerByDocumentUsecase',
        response,
        undefined,
        document
      );
    });

    app.post(`/`, (request: Request, response: Response) => {
      const player = request.body;
      this.handlerPostController<CreatePlayerUsecase, IPlayerModel>(
        DEPENDENCIES_CONTAINER,
        'CreatePlayerUsecase',
        response,
        'PlayerMapper',
        player
      );
    });
  }
}
