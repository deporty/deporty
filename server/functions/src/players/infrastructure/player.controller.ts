import { IPlayerModel } from "@deporty/entities/players";
import { Express, Request, Response } from "express";
import { handlerController, handlerPostController } from "../../core/controller";
import { CreatePlayerUsecase } from "../usecases/create-player/create-player.usecase";
import { DeletePlayerUsecase } from "../usecases/delete-player/delete-player.usecase";
import { GetPlayerByDocumentUsecase } from "../usecases/get-player-by-document/get-player-by-document.usecase";
import { GetPlayersUsecase } from "../usecases/get-players/get-players.usecase";

export class PlayerController {
  static prefix = "player";

  static identifier = "PLAYER";

  static registerEntryPoints(app: Express) {
    app.get(
      `/${this.prefix}/delete/:id`,
      (request: Request, response: Response) => {
        const id = request.params.id;
       
        handlerController<DeletePlayerUsecase, any>(
          "DeletePlayerUsecase",
          response,
          undefined,
          id
        );
      }
    );

    app.get(`/${this.prefix}s`, (request: Request, response: Response) => {
      handlerController<GetPlayersUsecase, any>("GetPlayersUsecase", response);
    });

    app.get(
      `/${this.prefix}/document/:document`,
      (request: Request, response: Response) => {
        const document = request.params.document;

        handlerController<GetPlayerByDocumentUsecase, any>(
          "GetPlayerByDocumentUsecase",
          response,
          undefined,
          document
        );
      }
    );

    app.post(`/${this.prefix}`, (request: Request, response: Response) => {
      const player = request.body;
      handlerPostController<CreatePlayerUsecase, IPlayerModel>(
        "CreatePlayerUsecase",
        response,
        "PlayerMapper",
        player
      );
    });
  }
}
