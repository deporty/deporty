"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TeamMapper = void 0;
const core_1 = require("@angular/core");
const player_mapper_1 = require("src/app/features/players/infrastructure/player/player.mapper");
let TeamMapper = class TeamMapper {
    constructor(playerMapper) {
        this.playerMapper = playerMapper;
    }
    fromJson(obj) {
        return {
            name: obj['name'],
            id: obj['id'],
            athem: obj['athem'],
            members: obj['members']
                ? obj['members'].map((item) => {
                    const obj = this.playerMapper.fromJson(item);
                    return obj;
                })
                : [],
            shield: obj['shield'],
            agent: obj['agent'],
        };
    }
    toJson(team) {
        return {
            name: team.name,
            athem: team.athem || '',
            members: team.members
                ? team.members.map((member) => {
                    return this.playerMapper.toJsonDB(member);
                })
                : [],
            shield: team.shield || '',
            agent: team.agent || '',
        };
    }
    toWeakJson(team) {
        return {
            name: team.name,
            id: team.id || '',
            shield: team.shield || '',
        };
    }
};
TeamMapper = __decorate([
    (0, core_1.Injectable)(),
    __metadata("design:paramtypes", [typeof (_a = typeof player_mapper_1.PlayerMapper !== "undefined" && player_mapper_1.PlayerMapper) === "function" ? _a : Object])
], TeamMapper);
exports.TeamMapper = TeamMapper;
//# sourceMappingURL=team.mapper.js.map