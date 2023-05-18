import {randomUUID} from "crypto";

// @Entity
export class UserEntity {
    id;
    userId;
    name;
    lastName;
    email;
    password;
    image;
    created_At;

    constructor(name,
        lastName,
        password,
        email,
        image) {
        this.name = name;
        this.lastName = lastName;
        this.password = password;
        this.email = email;
        this.image = image;
        this.userId = randomUUID()
    }
}