import { IsNumber, IsString } from "class-validator";


export class CreateBookDto{
    @IsNumber()
    isbn:number

    @IsString()
    bookName:string

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
}