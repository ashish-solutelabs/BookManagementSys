import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import {Strategy,ExtractJwt} from 'passport-jwt'
import { Repository } from "typeorm";
import { User } from "./entity/user.entity";
import { JwtPayload } from "./jwt-payload.interface";



@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(@InjectRepository(User) private repo: Repository<User>)
    {
        super({
            jwtFromRequest:ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey:'solute85',
        });
    }  
    
    async validate(payload:JwtPayload){
        const {email} = payload;
        const user= await this.repo.findOne({email})

        if(!user){
            throw new UnauthorizedException()
        }
        return user
    }
}