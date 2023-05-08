import {randomUUID} from "crypto";

// @Entity
export class UserEntity {
    public id?: number;
    public userId: string;
    public name: string;
    public lastName: string;
    public email: string;
    public password: string;
    public image?: string;
    public created_At?: Date;

    constructor(name: string,
        lastName: string,
        password: string,
        email: string,
        image?: string) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.image = image;
        this.userId = randomUUID()
    }
}