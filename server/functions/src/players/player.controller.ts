import { Express, Request, Response } from "express";
import { DEPENDENCIES_CONTAINER } from "../modules.config";
import { CreatePlayerUsecase } from "./usecases/create-player/create-player.usecase";
import { DeletePlayerUsecase } from "./usecases/delete-player/delete-player.usecase";
import { GetPlayerByDocumentUsecase } from "./usecases/get-player-by-document/get-player-by-document.usecase";
import { GetPlayersUsecase } from "./usecases/get-players/get-players.usecase";

export class PlayerController {
  static prefix = "player";
  static registerEntryPoints(app: Express) {
    app.get(
      `/${this.prefix}/delete/:id`,
      (request: Request, response: Response) => {
        const usecase = DEPENDENCIES_CONTAINER.getInstance<DeletePlayerUsecase>(
          "DeletePlayerUsecase"
        );

        const id = request.params.id;

        const dataRes = usecase.call(id);
        dataRes.subscribe({
          next: (data) => {
            console.log(data, "NEXT");
            response.send("The Player was deleted");
          },
          error: (err) => {
            console.log("ERROR");
            response.send(err);
          },
          complete: () => {
            console.log("COMPLETE");
            response.send("COMPLETADO");
          },
        });
      }
    );

    app.get(`/${this.prefix}s`, (request: Request, response: Response) => {
      const usecase =
        DEPENDENCIES_CONTAINER.getInstance<GetPlayersUsecase>(
          "GetPlayersUsecase"
        );

      const dataRes = usecase.call();
      dataRes.subscribe({
        next: (data) => {
          console.log(data, "NEXT");
          response.status(200).json(data);
        },
        error: (err) => {
          console.log("ERROR");
          response.send(err);
        },
        complete: () => {
          console.log("COMPLETE");
        },
      });
    });

    app.get(
      `/${this.prefix}/document/:document`,
      (request: Request, response: Response) => {
        const document = request.params.document;
        const usecase =
          DEPENDENCIES_CONTAINER.getInstance<GetPlayerByDocumentUsecase>(
            "GetPlayerByDocumentUsecase"
          );

        const dataRes = usecase.call(document);

        dataRes.subscribe({
          next: (data) => {
            console.log(data, "NEXT");
            response.status(200).json(data);
          },
          error: (err) => {
            console.log("ERROR");
            response.send(err);
          },
          complete: () => {
            console.log("COMPLETE");
          },
        });
      }
    );

    app.post(`/${this.prefix}`, (request: Request, response: Response) => {
      const usecase = DEPENDENCIES_CONTAINER.getInstance<CreatePlayerUsecase>(
        "CreatePlayerUsecase"
      );
      const player = request.body;
      const dataRes = usecase.call(player);
      dataRes.subscribe({
        next: (data) => {
          console.log(data, "NEXT");
          response.status(200).json(data);
        },
        error: (err) => {
          console.log("ERROR");
          response.send(err);
        },
        complete: () => {
          console.log("COMPLETE");
        },
      });
    });
  }
}
