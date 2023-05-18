// import { Injectable } from "../decorators/Injectable.dec.js";
// import { Autowired } from "../decorators/Autowired.dec.js";
import bcrypt from "bcryptjs";
import { UsersRepository } from "../database/Users.Repository.js";

// @Injectable("authService")
export class AuthService {

    // @Autowired("usersRepository")
    // repository;

    static async Authenticate(userData) {
        const response = await this.getUserByEmail(userData.email);
        if (!response) return { validUser: false, message: "This email doesn't exist" };
        const valid = this.validatePasword(userData.password, response.password);
        return !valid ? { validUser: false, message: "Incorrect Password!" } : { validUser: true, message: "Logged Successfully!", user: response }
    }

    static async getUserByEmail(email) {
        const user = await UsersRepository.SELECT_BY_COLUMN("email", email);
        return !user ? null : user;
    }

    static validatePasword(password, cPassword) {
        const response = bcrypt.compareSync(password, cPassword);
        return response
    }

    static async Register(user) {
        const response = await this.getUserByEmail(user.email);
        if (response) return false;
        await UsersRepository.INSERT(user);
        return true
    }

    static async getUsers() {
        const users = await UsersRepository.SELECT();
        return users;
    }
}