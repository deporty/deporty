import { Express, Request, Response } from 'express';
import {
  BaseController,
  IMessagesConfiguration
} from '../../core/controller/controller';
import { DEPENDENCIES_CONTAINER } from '../modules.config';
import { GetStatisticsUsecase } from '../usecases/get-statistics/get-statistics.usecase';

export class TournamentController extends BaseController {
  constructor() {
    super();
  }

  static identifier = 'TOURNAMENT';

  static registerEntryPoints(app: Express) {
    app.get(`/stadistics/:id`, (request: Request, response: Response) => {
      const id = request.params.id;
console.log(id,'455555')
      const config: IMessagesConfiguration = {
        exceptions: {},
        identifier: this.identifier,
        errorCodes: {},
        successCode: 'GET:SUCCESS',
        extraData: {
          name: id,
        },
      };

      this.handlerController<GetStatisticsUsecase, any>(
        DEPENDENCIES_CONTAINER,
        'GetStatisticsUsecase',
        response,
        config,
        undefined,
        id
      );
    });
  }
}
