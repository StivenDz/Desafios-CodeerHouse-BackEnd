import { UsersRepository } from "../database/Users.Repository";
import { UserEntity } from "../models/Entity/User.Entity";
import bcrypt from "bcryptjs";
import { UserDTO } from "../models/DTO/User.DTO";
import { AuthResponse } from "@types";
import { Injectable } from "../decorators/Injectable.dec";
import { Autowired } from "../decorators/Autowired.dec";

@Injectable("authService")
export class AuthService {

    @Autowired("usersRepository")
    private repository!: UsersRepository;

    public async Authenticate(userData: UserDTO): Promise<AuthResponse> {
        const response = await this.getUserByEmail(userData.email);
        if (!response) return { validUser: false, message: "This email doesn't exist" };
        const valid = this.validatePasword(userData.password, response.password);
        return !valid ? { validUser: false, message: "Incorrect Password!" } : { validUser: true, message: "Logged Successfully!", user: response }
    }

    public async getUserByEmail(email: string): Promise<UserEntity | null> {
        const user: UserEntity = await this.repository.SELECT_BY_COLUMN("email", email);
        return !user ? null : user;
    }

    private validatePasword(password: string, cPassword: string) {
        const response = bcrypt.compareSync(password, cPassword);
        return response
    }

    public async Register(user: UserEntity) {
        const response = await this.getUserByEmail(user.email);
        if (response) return false;
        await this.repository.INSERT(user);
        return true
    }

    public async getUsers(): Promise<Array<UserEntity>> {
        const users = await this.repository.SELECT();
        return users;
    }
}