import { Body, Controller, Post, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import {UserService} from './user.service'


@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/signup')
    async signup(@Body(ValidationPipe) body:CreateUserDto):Promise<void>{
        return  await this.userService.signup(body)
    }
    
    @Post('/signin')
    async signin(@Body(ValidationPipe) body:CreateUserDto):Promise<{accessToken:string}>{
        return await this.userService.signin(body);
    }
}
