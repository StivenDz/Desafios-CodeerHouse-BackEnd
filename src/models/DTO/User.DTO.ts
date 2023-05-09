import { UserEntity } from "../Entity/User.Entity";
import bcrypt from "bcryptjs";

// @DTO
export class UserDTO {
    public name: string;
    public lastName: string;
    public password: string;
    public email: string;
    public image?: string;

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
    }

    public toEntity(): UserEntity {
        return new UserEntity(
            this.name, 
            this.lastName, 
            bcrypt.hashSync(this.password), 
            this.email, 
            this.image
        )
    }
}