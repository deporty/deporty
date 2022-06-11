import { IPlayerModel } from "@deporty/entities/players";

export class PlayerMapper {
  fromJson(obj: any): IPlayerModel {
    return {
      name: obj["name"],
      lastName: obj["last-name"],
      id: obj["id"],
      document: obj["document"],
      alias: obj["alias"],
      number: obj["number"],
      role: obj["role"],
      image: obj["image"],
    };
  }

  toJson(player: IPlayerModel) {
    return {
      name: player.name,
      "last-name": player.lastName || "",
      document: player.document,
      alias: player.alias || "",
      number: player.number || "",
      role: player.role || "",
      image: player.image || "",
    };
  }

  toJsonDB(player: IPlayerModel) {
    return {
      name: player.name,
      "last-name": player.lastName || "",
      id: player.id,
      image: player.image || "",
    };
  }
}
