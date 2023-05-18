import { UserEntity } from "../Entity/User.Entity.js";
import bcrypt from "bcryptjs";

// @DTO
export class UserDTO {
    name;
    lastName;
    password;
    email;
    image;

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
    }

    toEntity() {
        return new UserEntity(
            this.name, 
            this.lastName, 
            bcrypt.hashSync(this.password), 
            this.email, 
            this.image
        )
    }
}