import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration,
} from '../../core/controller/controller';
import { DEPENDENCIES_CONTAINER } from '../modules.config';
import { GetMarkersTableUsecase } from '../usecases/get-markers-table/get-markers-table.usecase';
import { GetTournamentByIdUsecase } from '../usecases/get-tournament-by-id/get-tournament-by-id.usecase';

export class TournamentController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'TOURNAMENT';

  static registerEntryPoints(app: Express) {
    
    
    app.get(`/markers-table/:id`, (request: Request, response: Response) => {
      const id = request.params.id;
      console.log(id, 'iddd');
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
        DEPENDENCIES_CONTAINER,
        'GetMarkersTableUsecase',
        response,
        config,
        undefined,
        id
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
        DEPENDENCIES_CONTAINER,
        'GetTournamentByIdUsecase',
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
        DEPENDENCIES_CONTAINER,
        'CreateFixtureByGroupUsecase',
        response,
        config,
        undefined,
        params
      );
    });

 


    app.put(`/team`, (request: Request, response: Response) => {
      const params = request.body;

      const config: IMessagesConfiguration = {
        exceptions: {
          'TeamWasAlreadyRegistered': 'TEAM-ALREADY-REGISTERED:SUCCESS',
          'TeamDoesNotHaveMembers': 'TEAM-WITH-OUT-MEMBERS:SUCCESS'
        },
        identifier: this.identifier,
        errorCodes: {
          'TEAM-ALREADY-REGISTERED:SUCCESS': '{message}',
          'TEAM-WITH-OUT-MEMBERS:SUCCESS': '{message}'
        },
        successCode: 'TEAM-REGISTERED:SUCCESS',
        extraData: {
          ...params,
        },
      };

      this.handlerController<GetMarkersTableUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'AddTeamToTournamentUsecase',
        response,
        config,
        undefined,
        params
      );
    });


  }
}
