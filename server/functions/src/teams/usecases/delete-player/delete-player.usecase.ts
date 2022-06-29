import { Observable, of, throwError } from "rxjs";
import { VariableNotDefinedException } from "../../../core/exceptions";
import { Usecase } from "../../../core/usecase";
import { TeamContract } from "../../team.contract";




export class DeletePlayerUsecase extends Usecase<string, void> {
  constructor(public playerContract: TeamContract) {
    super();
  }
  call(id: string): Observable<void> {
    if (!id) {
      return throwError(new VariableNotDefinedException("id"));
    }
    return of();
  }
}
