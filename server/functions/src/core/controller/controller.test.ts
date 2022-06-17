import { Observable, of } from "rxjs";
import { DEPENDENCIES_CONTAINER } from "../../modules.config";
import { BaseController } from "./controller";
import { Usecase } from "../usecase";

class FakeUsecase extends Usecase<any, any> {
  call(param?: any): Observable<any> {
    return of("NULL");
  }
}
describe("Base controller functions", () => {
  const usecaseIdentifier = "sf";
  beforeAll(() => {
    DEPENDENCIES_CONTAINER.add({
      id: usecaseIdentifier,
      kind: FakeUsecase,
      strategy: "singleton",
      dependencies: [],
    });
  });
  test("should ", () => {
    const fakeResponse = {
      send: (data: any) => {},
    };
    BaseController.handlerController(usecaseIdentifier, fakeResponse as any);
    expect(true).toBe(true);
  });
});
