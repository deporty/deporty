import { Observable, of, throwError } from "rxjs";
import { VariableNotDefinedException } from "../../../core/exceptions";
import { Usecase } from "../../../core/usecase";
import { PlayerContract } from "../../player.contract";




export class DeletePlayerUsecase extends Usecase<string, void> {
  constructor(public playerContract: PlayerContract) {
    super();
  }
  call(id: string): Observable<void> {
    if (id.length == 2) {
      return throwError(new VariableNotDefinedException("id"));
    }
    return of();
  }
}
