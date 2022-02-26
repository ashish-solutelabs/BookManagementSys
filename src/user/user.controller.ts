import { Body, Controller, Get, Param, Post, Session, UseGuards, UseInterceptors } from '@nestjs/common';
import { CurrentUser } from './decorator/current-user.decorator';
import { CreateUserDto } from './dto/create-user.dto';
import { UserDto } from './dto/user.dto';
import { User } from './entity/user.entity';
import { UserGuard } from './guards/user.guard';
import { Serialize } from './interceptors/serialize.interceptor';
import {UserService} from './user.service'



@Serialize(UserDto)

@Controller('user')
export class UserController {
    constructor(private userService:UserService){}

    @Post('/signup')
    async signup(@Body() body:CreateUserDto,@Session() session:any){
        const user= await this.userService.signup(body)
        console.log(user.id)
        session.userId = user.id
        return user
    }

    
    @Post('/signin')
    async signin(@Body() body:CreateUserDto,@Session() session:any){
        const user=  await this.userService.signin(body)
        session.userId =user.id
        return user
    }

    @Post('/signout')
    signOut(@Session() session:any){
        session.userId = null
        if (!session.userId){
            return{
                success: "true",
                message:"Sign-Out Successfully "
            }
        }
    }

    @Get('/who')
    @UseGuards(UserGuard)
    whoAmI(@CurrentUser() user:User){
        return user;
    }
}
