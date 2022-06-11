import { Observable } from "rxjs";
export abstract class Usecase<Param, Response> {
  abstract call(param?: Param): Observable<Response>;
}
