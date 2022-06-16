import { IUserModel } from "../users/user.model";
export interface IPlayerModel extends IUserModel {
    number: number;
    role: string;
    alias: string;
    id: string;
}
export declare type ICreatePlayerModel = Omit<IPlayerModel, "id">;
