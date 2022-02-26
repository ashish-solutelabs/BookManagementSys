import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import { randomBytes,scrypt as _scrypt } from "crypto";
import { promisify } from "util";

const scrypt = promisify(_scrypt)


@Injectable()
export class UserService {
    constructor(@InjectRepository(User) private repo: Repository<User>){}

    async signup(body : any)
    {
        const {email,password} = body
        const users= await this.repo.find({email})
       
        if(users.length){
            throw new BadRequestException("Dublicate Email found")
        }

        //hashing
        const salt = randomBytes(8).toString('hex');
        const hash = await (scrypt(password,salt,16)) as Buffer;
        const result  = salt + '.'+hash.toString('hex');

        body.password = result

        const status = await this.repo.save(body);
        if(!status){
            throw new BadRequestException("user data is not store in server")
        }
        return status
    }


    async signin(body:any)
    {
        const {email,password} = body
        const [user]= await this.repo.find({email})
        if(!user){
            throw new BadRequestException("User is not found");
        }

        const [salt,storedHash] = user.password.split('.');

        const hash = (await scrypt(password,salt,16)) as Buffer;

        if(storedHash === hash.toString('hex'))
        {
            return user
        }else{
            throw new BadRequestException("bad password")
        }
    }

    async findUser(userId:number){
        return await this.repo.findOne(userId);
    }
}
