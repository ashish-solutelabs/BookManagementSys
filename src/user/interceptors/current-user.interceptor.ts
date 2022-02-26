import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { UserService } from "../user.service";


@Injectable()
export class CurrentUserInterceptor implements NestInterceptor
{   
    constructor(private userService:UserService) { }

    async intercept(context: ExecutionContext, handler: CallHandler<any>) {
        const request = context.switchToHttp().getRequest();
        const { userId } = request.session;
        
        console.log("USer ID: ",userId)

        if (userId)
        {
            const user = await this.userService.findUser(userId);
            request.currentUser = user;
        }

        return handler.handle()
    }
}