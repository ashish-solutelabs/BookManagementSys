import { IsNumber, IsString } from "class-validator";


export class CreateBookDto{
    @IsString()
    isbn:string

    @IsString()
    bookname:string

    @IsString()
    auther:string
    
    @IsString()
    description:string

    @IsString()
    publisher:string

    @IsString()
    language:string

    @IsNumber()
    paperback:number

    @IsNumber()
    price:number
    user: import("d:/Company task/src/user/entity/user.entity").User;
}