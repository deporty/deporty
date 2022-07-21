import { ITeamModel } from '@deporty/entities/teams';
import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration,
} from '../../core/controller/controller';
import { Container } from '../../core/DI';
import { AsignPlayerToTeamUsecase } from '../usecases/asign-player-to-team/asign-player-to-team.usecase';
import { CreateTeamUsecase } from '../usecases/create-team/create-team.usecase';
import { DeleteTeamUsecase } from '../usecases/delete-team/delete-team.usecase';
import { GetActiveTournamentsByRegisteredTeamUsecase } from '../usecases/get-active-tournaments-by-registered-team/get-active-tournaments-by-registered-team.usecase';
import { GetTeamByIdUsecase } from '../usecases/get-team-by-id/get-team-by-id.usecase';
import { GetTeamsUsecase } from '../usecases/get-teams/get-teams.usecase';

export class TeamController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'TEAM';

  static registerEntryPoints(app: Express, container: Container) {
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
        container,
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
        container,
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
        container,
        'GetTeamByNameUsecase',
        response,
        config,
        undefined,
        name
      );
    });

    app.get(`/:id`, (request: Request, response: Response) => {
      const id = request.params.id;

      const config: IMessagesConfiguration = {
        exceptions: {
          TeamDoesNotExist: 'GET:ID:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'GET:ID:ERROR': '{message}',
        },
        successCode: {
          code: 'GET:ID:SUCCESS',
          message: 'Information for team with id {id}',
        },
        extraData: {
          id: id,
        },
      };

      this.handlerController<GetTeamByIdUsecase, any>(
        container,
        'GetTeamByIdUsecase',
        response,
        config,
        undefined,
        id
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
          entitiesName: 'Team',
        },
      };

      this.handlerPostController<CreateTeamUsecase, ITeamModel>(
        container,
        'CreateTeamUsecase',
        response,
        config,
        'TeamMapper',
        team
      );
    });

    app.put(`/assign-player`, (request: Request, response: Response) => {
      const data = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          PlayerIsAlreadyInTeamException: 'PLAYER-ALREADY-EXISTS:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'PLAYER-ALREADY-EXISTS:ERROR': '{message}',
        },
        successCode: {
          code: 'PLAYER-ASSIGNED:SUCCESS',
          message: 'The player was assigned.',
        },
        extraData: {
          entitiesName: 'Team',
        },
      };

      this.handlerPostController<AsignPlayerToTeamUsecase, ITeamModel>(
        container,
        'AsignPlayerToTeamUsecase',
        response,
        config,
        undefined,
        data
      );
    });

    app.get(
      `/by-registered-team/:id`,
      (request: Request, response: Response) => {
        const id = request.params.id;

        const config: IMessagesConfiguration = {
          exceptions: {},
          identifier: this.identifier,
          errorCodes: {},
          successCode: 'BY-REGISTERED-TEAM:SUCCESS',
          extraData: {
            name: id,
          },
        };

        this.handlerController<
          GetActiveTournamentsByRegisteredTeamUsecase,
          any
        >(
          container,
          'GetActiveTournamentsByRegisteredTeamUsecase',
          response,
          config,
          undefined,
          id
        );
      }
    );
  }
}
