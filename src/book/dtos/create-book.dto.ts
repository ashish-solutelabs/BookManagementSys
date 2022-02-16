import { IsEmail, IsNumber, IsString } from "class-validator";


export class creatBookDto{
    @IsNumber()
    ISBN:number

    @IsString()
    BookName:string

    @IsString()
    Auther:string
    
    @IsString()
    Description:string

    @IsString()
    Publisher:string

    @IsString()
    Language:string

    @IsNumber()
    Paperback:number
}