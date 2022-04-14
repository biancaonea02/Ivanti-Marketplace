import { Package } from "./package";
import { Role } from "./role";

export class User {

    public id: number;
    public name: string;
    public username: string;
    public email: string;
    public roles: Role[];
    public token: string;
    public favourite_packages_id: number[];
    public firstTime: boolean;

    constructor() {
        this.name = '';
        this.username = '';
        this.email = '';
        this.roles = [];
        this.token = '';
        this.favourite_packages_id = [];
    }



}