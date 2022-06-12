import { VariableNotDefinedException } from "../../../core/exceptions";
import { DeletePlayerUsecase } from "./delete-player.usecase";

import { configDependencies } from "../../../index";
import { DEPENDENCIES_CONTAINER } from "../../../modules.config";
describe("DeletePlayerUsecase", () => {
  let deletePlayerUsecase: DeletePlayerUsecase;

  beforeAll(() => {
    configDependencies();
    deletePlayerUsecase = DEPENDENCIES_CONTAINER.getInstance(
      "DeletePlayerUsecase"
    );
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
