import { ICreatePlayerModel, IPlayerModel } from "@deporty/entities/players";
import { Mapper } from "../core/mapper";

export class PlayerMapper extends Mapper<IPlayerModel> {
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

  fromJsonWithOutId(obj: any): ICreatePlayerModel {
    return {
      name: obj["name"],
      lastName: obj["last-name"],
      document: obj["document"],
      alias: obj["alias"],
      number: obj["number"],
      role: obj["role"],
      image: obj["image"],
    };
  }

  toJson(player: ICreatePlayerModel) {
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
}
