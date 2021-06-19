export class User{
    _id?: string = Math.random().toString(36).substr(2, 9);
    name?: string;
    password?: string;
    email?: string;
}