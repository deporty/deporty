import { VariableNotDefinedException } from "../../../core/exceptions";
import {
  DeletePlayerUsecase,
  PlayersDataSource,
} from "./delete-player.usecase";
describe("DeletePlayerUsecase", () => {
  let deletePlayerUsecase: DeletePlayerUsecase;

  beforeAll(() => {
    deletePlayerUsecase = new DeletePlayerUsecase(new PlayersDataSource());
  });
  test("Should create instance", () => {
    expect(deletePlayerUsecase).not.toBeNull();
  });

  test("Should throw a VariableNotDefinedException exception when the id is empty", (done) => {
    const response = deletePlayerUsecase.call("");
    response.subscribe({
      error: (err) => {
        expect(err).toBeInstanceOf(VariableNotDefinedException);
        done();
      },
    });
  });
});
