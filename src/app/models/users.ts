import { Addresses } from "./addresses";
import { Roles } from "./roles";

export interface Users {
    idUser: number;
    username: string;
    firstName: string;
    lastName: string;
    email: string;
    celPhone: string;
    birthday?: string;
    gender: string;
    password?: string;
    roles?: Roles[];
    addresses?: Addresses[];
}