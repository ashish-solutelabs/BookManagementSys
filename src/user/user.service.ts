import {  ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entity/user.entity';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';




@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) private repo: Repository<User>,
        private jwtService:JwtService,
    ){}

    async signup(body : any)
    {
        const { email, password } = body;

        const dublicateEmail = this.repo.findOne({email});
        if(dublicateEmail){
          throw new ConflictException("dublicate email found")
        }

        const user = new User();

        user.email = email;
        const salt = await bcrypt.genSalt();
        user.password = await this.hashPassword(password, salt);

        try {
            await this.repo.save(user);
        } catch (error) {

          if (error.code === '23505') {
            throw new ConflictException('email already exists');
          } else {
            throw new InternalServerErrorException();
          }
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }

    async validateUserPassword(createUserDto: CreateUserDto): Promise<string> {
        const { email, password } = createUserDto;
        const user = await this.repo.findOne({ email });
    
        if (user && await user.validatePassword(password)) {
          return user.email;
        } else {
          return null;
        }
    }

    async signin(body:any) :Promise<{accessToken:string}>{
        const email = await this.validateUserPassword(body);

        if (!email) {
             throw new UnauthorizedException('Invalid credentials');
        }
        const payload:JwtPayload = { email }
        const accessToken = this.jwtService.sign(payload);

        return {accessToken}
    }
}
