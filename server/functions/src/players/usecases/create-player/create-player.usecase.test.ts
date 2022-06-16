import { of } from "rxjs";
import { configDependencies } from "../../..";
import { DEPENDENCIES_CONTAINER } from "../../../modules.config";
import { GetPlayerByDocumentUsecase } from "../get-player-by-document/get-player-by-document.usecase";
import { GetPlayerByEmailUsecase } from "../get-player-by-email/get-player-by-email.usecase";
import { CreatePlayerUsecase } from "./create-player.usecase";
import { IPlayerModel } from "@deporty/entities/players";
import { PlayerAlreadyExistsException } from "./create-player.exceptions";
describe("CreatePlayerUsecase", () => {
  let createPlayerUsecase: CreatePlayerUsecase;
  let getPlayerByDocumentUsecase: GetPlayerByDocumentUsecase;
  let getPlayerByEmailUsecase: GetPlayerByEmailUsecase;

  // let getPlayerByDocumentUsecaseMock;

  beforeAll(() => {
    configDependencies();

    createPlayerUsecase =
      DEPENDENCIES_CONTAINER.getInstance<CreatePlayerUsecase>(
        "CreatePlayerUsecase"
      );

    getPlayerByDocumentUsecase =
      DEPENDENCIES_CONTAINER.getInstance<GetPlayerByDocumentUsecase>(
        "GetPlayerByDocumentUsecase"
      );

    getPlayerByEmailUsecase =
      DEPENDENCIES_CONTAINER.getInstance<GetPlayerByEmailUsecase>(
        "GetPlayerByEmailUsecase"
      );
  });
  test("Should create instance", () => {
    expect(createPlayerUsecase).not.toBeNull();
  });

  test("Should return a PlayerAlreadyExistsException when the document exists in the db", (done) => {
    jest
      .spyOn(getPlayerByDocumentUsecase, "call")
      .mockImplementation((document: string) => {
        return of({
          name: "Fka",
          document: "10235678989",
        } as IPlayerModel);
      });

    const response = createPlayerUsecase.call({
      document: "10534521654",
    } as any);
    response.subscribe({
      error: (error) => {
        expect(error).toBeInstanceOf(PlayerAlreadyExistsException);
        done();
      },
    });
  });

  test("Should return a PlayerAlreadyExistsException when the email exists in the db", (done) => {

    jest
    .spyOn(getPlayerByDocumentUsecase, "call")
    .mockImplementation((document: string) => {
      return of(undefined);
    });

    jest
      .spyOn(getPlayerByEmailUsecase, "call")
      .mockImplementation((email: string) => {
        return of({
          name: "Fake user",
        } as IPlayerModel);
      });

    const response = createPlayerUsecase.call({
      document: "10534521654",
      email: "aksldfjañk@gmail.com",

    } as any);
    response.subscribe({
      error: (error) => {
        console.log(error)
        expect(error).toBeInstanceOf(PlayerAlreadyExistsException);
        done();
      },
    });
  });
});
