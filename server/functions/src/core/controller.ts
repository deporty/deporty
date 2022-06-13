import { Response } from "express";
import { DEPENDENCIES_CONTAINER } from "../modules.config";
import { Mapper } from "./mapper";

export function handlerPostController<T extends { call: (param?: any) => any }, M>(
  usecaseIdentifier: string,
  response: Response,
  mapper?: string,
  param?: any
) {
  let func = null;
  if (mapper) {
    const mapperObj = DEPENDENCIES_CONTAINER.getInstance<Mapper<M>>(mapper);
    func = mapperObj.fromJsonWithOutId;
  }

  generalHandlerController<T, M>(usecaseIdentifier, param, func, response);
}

export function handlerController<T extends { call: (param?: any) => any }, M>(
  usecaseIdentifier: string,
  response: Response,
  mapper?: string,
  param?: any
) {
  let func = null;
  if (mapper) {
    const mapperObj = DEPENDENCIES_CONTAINER.getInstance<Mapper<M>>(mapper);
    func = mapperObj.fromJson;
  }

  generalHandlerController<T, M>(usecaseIdentifier, param, func, response);
}
function generalHandlerController<T extends { call: (param?: any) => any }, M>(
  usecaseIdentifier: string,
  param: any,
  func: Function | null,
  response: Response<any, Record<string, any>>
) {
  const usecase = DEPENDENCIES_CONTAINER.getInstance<T>(usecaseIdentifier);
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
      response.send(data);
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
