import { Response } from 'express';
import { Mapper } from '../mapper';
import { IBaseResponse } from '@deporty/entities/general';
import { Container } from '../DI';
import { DEFAULT_MESSAGES } from './code-responses';

export interface IMessagesConfiguration {
  exceptions: {
    [index: string]: string;
  };
  errorCodes: {
    [index: string]: string;
  };
  extraData?: any;
  successCode:
    | string
    | {
        [index: string]: string;
      };
  identifier: string;
}

export abstract class BaseController {
  public static handlerPostController<
    T extends { call: (param?: any) => any },
    M
  >(
    container: Container,
    usecaseIdentifier: string,
    response: Response,
    config: IMessagesConfiguration,
    mapper?: string,
    param?: any
  ) {
    let func = null;
    if (mapper) {
      const mapperObj = container.getInstance<Mapper<M>>(mapper).instance;
      func = mapperObj.fromJsonWithOutId;
    }

    this.generalHandlerController<T, M>(
      container,
      usecaseIdentifier,
      param,
      func,
      response,
      config
    );
  }

  public static handlerController<T extends { call: (param?: any) => any }, M>(
    container: Container,

    usecaseIdentifier: string,
    response: Response,
    config: IMessagesConfiguration,
    mapper?: string,
    param?: any
  ) {
    let func = null;
    if (mapper) {
      const mapperObj = container.getInstance<Mapper<M>>(mapper).instance;
      func = mapperObj.fromJson;
    }

    this.generalHandlerController<T, M>(
      container,
      usecaseIdentifier,
      param,
      func,
      response,
      config
    );
  }
  private static generalHandlerController<
    T extends { call: (param?: any) => any },
    M
  >(
    container: Container,
    usecaseIdentifier: string,
    param: any,
    func: Function | null,
    response: Response<any, Record<string, any>>,
    config: IMessagesConfiguration
  ) {
    const usecase = container.getInstance<T>(usecaseIdentifier).instance;
    let dataRes = null;
    let params = param;

    if (func) {
      if (param) {
        params = func(param);
        dataRes = usecase.call(params);
      } else {
        dataRes = usecase.call();
      }
    } else {
      if (param) {
        dataRes = usecase.call(param);
      } else {
        dataRes = usecase.call();
      }
    }

    dataRes.subscribe({
      next: (data: any) => {
        let code = '';
        let message = '';
        if (typeof config.successCode == 'string') {
          code = `${config.identifier}-${config.successCode}`;
          message = DEFAULT_MESSAGES[config.successCode];
        } else {
          code = `${config.identifier}-${config.successCode.code}`;
          message = config.successCode.message;
        }
        message = BaseController.formatMessage(message, config.extraData);

        response.send({
          meta: {
            code,
            message,
          },
          data,
        } as IBaseResponse<any>);
      },
      error: (error: any) => {
        console.log(error,'{Controller.ts}')
        const resp = this.makeErrorMessage(config, error);
        response.send(resp);
      },
      complete: () => {
        response.send();
      },
    });
  }

  static makeErrorMessage(config: IMessagesConfiguration, error: Error) {
    const data: any = { ...error };
    const name = error.constructor.name;
    let httpMessageCode = config.exceptions[name];
    let message = '';
    if (httpMessageCode) {
      message = config.errorCodes[httpMessageCode];

      message = BaseController.formatMessage(message, data);
    } else {
      httpMessageCode = 'SERVER:ERROR';
      message = DEFAULT_MESSAGES[httpMessageCode];
    }
    const code = `${config.identifier}-${httpMessageCode}`;
    return {
      meta: {
        code,
        message,
      },
    } as IBaseResponse<undefined>;
  }

  private static formatMessage(message: string, data: any) {
    const keys = this.getKeys(message);
    if (keys) {
      for (const key of keys) {
        message = message.replace(`{${key}}`, data[key]);
      }
    }
    return message;
  }

  private static getKeys(message: string) {
    const pattern = '{([A-Za-z]+)}';

    const regex = new RegExp(pattern);
    return regex.exec(message);
  }
}
