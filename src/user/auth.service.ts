import { Injectable } from "@nestjs/common";
import { UserService } from "./user.service";
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)

@Injectable()
export class AuthService {
    constructor(private userService:UserService){}
}