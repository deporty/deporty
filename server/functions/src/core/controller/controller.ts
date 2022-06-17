import { Response } from "express";
import { Mapper } from "../mapper";
import { IBaseResponse } from "@deporty/entities/general";
import { Container } from "../DI";

export abstract class BaseController {
  public static handlerPostController<
    T extends { call: (param?: any) => any },
    M
  >(
    container: Container,
    usecaseIdentifier: string,
    response: Response,
    mapper?: string,
    param?: any
  ) {
    let func = null;
    if (mapper) {
      const mapperObj = container.getInstance<Mapper<M>>(mapper);
      func = mapperObj.fromJsonWithOutId;
    }

    this.generalHandlerController<T, M>(
      container,
      usecaseIdentifier,
      param,
      func,
      response
    );
  }

  public static handlerController<T extends { call: (param?: any) => any }, M>(
    container: Container,

    usecaseIdentifier: string,
    response: Response,
    mapper?: string,
    param?: any
  ) {
    let func = null;
    if (mapper) {
      const mapperObj = container.getInstance<Mapper<M>>(mapper);
      func = mapperObj.fromJson;
    }

    this.generalHandlerController<T, M>(
    container,
      usecaseIdentifier,
      param,
      func,
      response
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
    response: Response<any, Record<string, any>>
  ) {
    const usecase = container.getInstance<T>(usecaseIdentifier);
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
        response.send({
          meta: {
            code: "200",
            message: "",
          },
          data,
        } as IBaseResponse);
      },
      error: (err: any) => {
        console.log(err);
        response.send(err);
      },
      complete: () => {
        response.send();
      },
    });
  }
}
