import type { Site } from "./Site";

export interface User {
    userId : number,
    name : string,
    email :  string,
    login : string,
    password: string,
    sites : Site[],
};

export const UserDefaultState : User = {
    userId : 0,
    name : '',
    email :  '',
    login : '',
    password: '',
    sites : [],
};