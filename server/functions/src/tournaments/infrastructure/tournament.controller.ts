import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration
} from '../../core/controller/controller';
import { DEPENDENCIES_CONTAINER } from '../modules.config';
import { GetMarkersTableUsecase } from '../usecases/get-markers-table/get-markers-table.usecase';

export class TournamentController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'TOURNAMENT';

  static registerEntryPoints(app: Express) {
    app.get(`/markers-table/:id`, (request: Request, response: Response) => {
      const id = request.params.id;
      console.log(id,'iddd')
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
  }
}
