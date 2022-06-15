import { configDependencies } from "../../..";
import { DEPENDENCIES_CONTAINER } from "../../../modules.config";
import { CreatePlayerUsecase } from "./create-player.usecase";

describe('CreatePlayerUsecase',()=>{


    let createPlayerUsecase: CreatePlayerUsecase;

    beforeAll(() => {
      configDependencies();
      createPlayerUsecase = DEPENDENCIES_CONTAINER.getInstance<CreatePlayerUsecase>(
        "CreatePlayerUsecase"
      );
    });
    test("Should create instance", () => {
      expect(createPlayerUsecase).not.toBeNull();
    });

    
    test('',()=>{

    })
})