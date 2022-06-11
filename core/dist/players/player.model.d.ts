import { IUserModel } from "../users/user.model";
export interface IPlayerModel extends Omit<IUserModel, 'phone' | 'email'> {
    number: number;
    role: string;
    alias: string;
    id: string;
}
export declare type ICreatePlayerModel = Omit<IPlayerModel, 'id'>;
