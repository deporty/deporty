import { ITeamModel } from '@deporty/entities/teams';
import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration,
} from '../../core/controller/controller';
import { DEPENDENCIES_CONTAINER } from '../modules.config';
import { CreateTeamUsecase } from '../usecases/create-team/create-team.usecase';
import { DeleteTeamUsecase } from '../usecases/delete-team/delete-team.usecase';
import { GetTeamByIdUsecase } from '../usecases/get-team-by-id/get-team-by-id.usecase';
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
          entitiesName: 'team',
        },
      };

      this.handlerController<DeleteTeamUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'DeleteTeamUsecase',
        response,
        config,
        undefined,
        id
      );
    });

    app.get(`/`, (request: Request, response: Response) => {
      const config: IMessagesConfiguration = {
        exceptions: {
          TeamAlreadyExistsException: 'GET:ERROR',
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

    app.get(`/name/:name`, (request: Request, response: Response) => {
      const name = request.params.name;

      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: {
          code: 'GET:NAME:SUCCESS',
          message: 'Information for team with name {name}',
        },
        extraData: {
          name,
        },
      };

      this.handlerController<GetTeamByIdUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'GetTeamByNameUsecase',
        response,
        config,
        undefined,
        name
      );
    });

    app.post(`/`, (request: Request, response: Response) => {
      const team = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          TeamAlreadyExistsException: 'POST:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'POST:ERROR': '{message}',
        },
        successCode: 'POST:SUCCESS',
        extraData: {
          entitiesName: 'team',
        },
      };

      this.handlerPostController<CreateTeamUsecase, ITeamModel>(
        DEPENDENCIES_CONTAINER,
        'CreateTeamUsecase',
        response,
        config,
        'TeamMapper',
        team
      );
    });
  }
}
