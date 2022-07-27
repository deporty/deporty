import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration,
} from '../../core/controller/controller';
import { Container } from '../../core/DI';
import { AddMatchToGroupInsideTournamentUsecase } from '../usecases/add-match-to-group-inside-tournament/add-match-to-group-inside-tournament.usecase';
import { AddTeamToGroupInsideTournamentUsecase } from '../usecases/add-team-to-group-inside-tournament/add-team-to-group-inside-tournament.usecase';
import { AddTeamToTournamentUsecase } from '../usecases/add-team-to-tournament/add-team-to-tournament.usecase';
import { AddTeamsToGroupInsideTournamentUsecase } from '../usecases/add-teams-to-group-inside-tournament/add-teams-to-group-inside-tournament.usecase';
import { EditMatchToGroupInsideTournamentUsecase } from '../usecases/edit-match-to-group-inside-tournament/edit-match-to-group-inside-tournament.usecase';
import { GetMarkersTableUsecase } from '../usecases/get-markers-table/get-markers-table.usecase';
import { GetPosibleTeamsToAddUsecase } from '../usecases/get-posible-teams-to-add/get-posible-teams-to-add.usecase';
import { GetTournamentByIdUsecase } from '../usecases/get-tournament-by-id/get-tournament-by-id.usecase';
import { GetTournamentsUsecase } from '../usecases/get-tournaments/get-tournaments.usecase';

export class TournamentController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'TOURNAMENT';

  static registerEntryPoints(app: Express, container: Container) {
    app.get(`/markers-table/:id`, (request: Request, response: Response) => {
      const id = request.params.id;

      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: 'GET:SUCCESS',
        extraData: {
          name: id,
        },
      };

      this.handlerController<GetMarkersTableUsecase, any>(
        container,
        'GetMarkersTableUsecase',
        response,
        config,
        undefined,
        id
      );
    });

    app.put(`/fixture-group`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: 'FIXTURE-GROUP:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<GetMarkersTableUsecase, any>(
        container,
        'CreateFixtureByGroupUsecase',
        response,
        config,
        undefined,
        params
      );
    });

    app.put(`/add-team`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          TeamWasAlreadyRegistered: 'TEAM-ALREADY-REGISTERED:ERROR',
          TeamDoesNotHaveMembers: 'TEAM-WITH-OUT-MEMBERS:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'TEAM-ALREADY-REGISTERED:ERROR': '{message}',
          'TEAM-WITH-OUT-MEMBERS:ERROR': '{message}',
        },
        successCode: 'TEAM-REGISTERED:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<AddTeamToTournamentUsecase, any>(
        container,
        'AddTeamToTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });

    app.get(
      `/available-teams-to-add/:id`,
      (request: Request, response: Response) => {
        const id = request.params.id;

        const config: IMessagesConfiguration = {
          exceptions: {},
          identifier: this.identifier,
          errorCodes: {},
          successCode: {
            code: 'GET-AVAILABLE-TEAMS:SUCCESS',
            message: 'Available teams for the tournament with id "{id}"',
          },
          extraData: {
            id,
          },
        };

        this.handlerController<GetPosibleTeamsToAddUsecase, any>(
          container,
          'GetPosibleTeamsToAddUsecase',
          response,
          config,
          undefined,
          id
        );
      }
    );

    app.get(`/`, (request: Request, response: Response) => {
      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: 'GET:SUCCESS',
        extraData: {},
      };

      this.handlerController<GetTournamentsUsecase, any>(
        container,
        'GetTournamentsUsecase',
        response,
        config,
        undefined
      );
    });

    app.get(`/:id`, (request: Request, response: Response) => {
      const id = request.params.id;
      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: 'GET:SUCCESS',
        extraData: {
          name: id,
        },
      };

      this.handlerController<GetTournamentByIdUsecase, any>(
        container,
        'GetTournamentByIdUsecase',
        response,
        config,
        undefined,
        id
      );
    });

    app.put(`/add-match`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          MatchWasAlreadyRegistered: 'MATCH-ALREADY-REGISTERED:ERROR',
          StageDoesNotExist: 'STAGE-DOES-NOT-EXIST:ERROR',
          GroupDoesNotExist: 'GROUP-DOES-NOT-EXIST:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'MATCH-ALREADY-REGISTERED:ERROR': '{message}',
          'STAGE-DOES-NOT-EXIST:ERROR': '{message}',
          'GROUP-DOES-NOT-EXIST:ERROR': '{message}',
        },
        successCode: 'MATCH-REGISTERED:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<AddMatchToGroupInsideTournamentUsecase, any>(
        container,
        'AddMatchToGroupInsideTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });


    app.put(`/add-team-into-group`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          TeamIsAlreadyInTheGroup: 'TEAM-IS-ALREADY-IN-THE-GROUP:ERROR',
          StageDoesNotExist: 'STAGE-DOES-NOT-EXIST:ERROR',
          GroupDoesNotExist: 'GROUP-DOES-NOT-EXIST:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'TEAM-IS-ALREADY-IN-THE-GROUP:ERROR': '{message}',
          'STAGE-DOES-NOT-EXIST:ERROR': '{message}',
          'GROUP-DOES-NOT-EXIST:ERROR': '{message}',
        },
        successCode: 'TEAM-REGISTERED-INTO-GROUP:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<AddTeamToGroupInsideTournamentUsecase, any>(
        container,
        'AddTeamToGroupInsideTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });
    app.put(`/add-teams-into-group`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          MatchWasAlreadyRegistered: 'MATCH-ALREADY-REGISTERED:ERROR',
          StageDoesNotExist: 'STAGE-DOES-NOT-EXIST:ERROR',
          GroupDoesNotExist: 'GROUP-DOES-NOT-EXIST:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'MATCH-ALREADY-REGISTERED:ERROR': '{message}',
          'STAGE-DOES-NOT-EXIST:ERROR': '{message}',
          'GROUP-DOES-NOT-EXIST:ERROR': '{message}',
        },
        successCode: 'TEAM-REGISTERED-INTO-GROUP:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<AddTeamsToGroupInsideTournamentUsecase, any>(
        container,
        'AddTeamsToGroupInsideTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });





    app.put(`/edit-match-into-group`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          MatchDoesNotExist: 'MATCH-DOES-NOT-EXIST:ERROR',
          StageDoesNotExist: 'STAGE-DOES-NOT-EXIST:ERROR',
          GroupDoesNotExist: 'GROUP-DOES-NOT-EXIST:ERROR',
        },
        identifier: this.identifier,
        errorCodes: {
          'MATCH-DOES-NOT-EXIST:ERROR': '{message}',
          'STAGE-DOES-NOT-EXIST:ERROR': '{message}',
          'GROUP-DOES-NOT-EXIST:ERROR': '{message}',
        },
        successCode: 'MATCH-EDITED:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<EditMatchToGroupInsideTournamentUsecase, any>(
        container,
        'EditMatchToGroupInsideTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });

  }
}
