import { IPlayerModel } from '@deporty/entities/players';
import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration,
} from '../../core/controller/controller';
import { DEPENDENCIES_CONTAINER } from '../modules.config';
import { CreatePlayerUsecase } from '../usecases/create-player/create-player.usecase';
import { DeletePlayerUsecase } from '../usecases/delete-player/delete-player.usecase';
import { GetPlayerByDocumentUsecase } from '../usecases/get-player-by-document/get-player-by-document.usecase';
import { GetTeamsUsecase } from '../usecases/get-teams/get-teams.usecase';

export class TeamController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'TEAM';

  static registerEntryPoints(app: Express) {
    app.get(`/delete/:id`, (request: Request, response: Response) => {
      const id = request.params.id;

      const config: IMessagesConfiguration = {
        exceptions: {
          VariableNotDefinedException: 'DELETE:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'DELETE:ERROR': '{message}',
        },
        successCode: 'DELETE:SUCCESS',
        extraData: {
          entitiesName: 'player',
        },
      };

      this.handlerController<DeletePlayerUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'DeletePlayerUsecase',
        response,
        config,
        undefined,
        id
      );
    });

    app.get(`/`, (request: Request, response: Response) => {
      const config: IMessagesConfiguration = {
        exceptions: {
          PlayerAlreadyExistsException: 'GET:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'GET:ERROR': '{message}',
        },
        successCode: 'GET:SUCCESS',
        extraData: {
          entitiesName: 'teams',
        },
      };

      this.handlerController<GetTeamsUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'GetTeamsUsecase',
        response,
        config
      );
    });

    app.get(`/document/:document`, (request: Request, response: Response) => {
      const document = request.params.document;

      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: {
          code: 'GET:DOCUMENT:SUCCESS',
          message: 'Information for player with document {document}',
        },
        extraData: {
          document,
        },
      };

      this.handlerController<GetPlayerByDocumentUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'GetPlayerByDocumentUsecase',
        response,
        config,
        undefined,
        document
      );
    });

    app.post(`/`, (request: Request, response: Response) => {
      const player = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          PlayerAlreadyExistsException: 'POST:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'POST:ERROR': '{message}',
        },
        successCode: 'POST:SUCCESS',
        extraData: {
          entitiesName: 'player',
        },
      };

      this.handlerPostController<CreatePlayerUsecase, IPlayerModel>(
        DEPENDENCIES_CONTAINER,
        'CreatePlayerUsecase',
        response,
        config,
        'PlayerMapper',
        player
      );
    });
  }
}
