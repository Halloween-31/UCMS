export interface User {
    userId : number,
    name : string,
    email :  string,
    login : string,
    password: string,
    sites : any[],
};

export const UserDefaultState : User = {
    userId : 0,
    name : '',
    email :  '',
    login : '',
    password: '',
    sites : [],
};