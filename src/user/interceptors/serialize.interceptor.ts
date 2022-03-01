// import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
// import { plainToClass } from "class-transformer";
// import { Observable,map } from "rxjs";
// import { UserDto } from "../dto/user.dto";

// interface ClassConstructor{
//     new (...args:any[]):{}
// }


// export function Serialize(dto:ClassConstructor)
// {
//     return UseInterceptors(new SerializeInterceptor(dto))
// }

//  export class SerializeInterceptor implements NestInterceptor{

//     constructor(private dto:any){}

//      intercept(context: ExecutionContext, next: CallHandler):Observable<any>{
//         console.log("handler before")


//         return next.handle().pipe(
//             map((data:any)=>{
//                 console.log("Runnig handler")
//                 return plainToClass(UserDto,data,{
//                     excludeExtraneousValues:true,
//                 })
//             })
//         )
         
//      }
//  }