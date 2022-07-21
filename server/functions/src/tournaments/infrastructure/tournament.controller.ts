import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration
} from '../../core/controller/controller';
import { Container } from '../../core/DI';
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
          'TeamWasAlreadyRegistered': 'TEAM-ALREADY-REGISTERED:ERROR',
          'TeamDoesNotHaveMembers': 'TEAM-WITH-OUT-MEMBERS:ERROR'
        },
        identifier: this.identifier,
        errorCodes: {
          'TEAM-ALREADY-REGISTERED:ERROR': '{message}',
          'TEAM-WITH-OUT-MEMBERS:ERROR': '{message}'
        },
        successCode: 'TEAM-REGISTERED:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<GetMarkersTableUsecase, any>(
        container,
        'AddTeamToTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });



    app.get(`/available-teams-to-add/:id`, (request: Request, response: Response) => {
      const id = request.params.id;

      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: {
          code: 'GET-AVAILABLE-TEAMS:SUCCESS',
          message: 'Available teams for the tournament with id "{id}"'
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
    });




    

    app.get(`/`, (request: Request, response: Response) => {
      
      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: 'GET:SUCCESS',
        extraData: {
        },
      };

      this.handlerController<GetTournamentsUsecase, any>(
        container,
        'GetTournamentsUsecase',
        response,
        config,
        undefined,
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



  

  }
}
