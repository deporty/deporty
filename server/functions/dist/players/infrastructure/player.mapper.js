"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerMapper = void 0;
const mapper_1 = require("../../core/mapper");
class PlayerMapper extends mapper_1.Mapper {
    fromJson(obj) {
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
    fromJsonWithOutId(obj) {
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
    toJson(player) {
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
exports.PlayerMapper = PlayerMapper;
//# sourceMappingURL=player.mapper.js.map