import { IsEmail, IsNumber, IsOptional, IsString } from "class-validator";

export class updateBookDto{
    @IsNumber()
    @IsOptional()
    ISBN:number

    @IsString()
    @IsOptional()
    BookName:string

    @IsString()
    @IsOptional()
    Auther:string
    
    @IsString()
    @IsOptional()
    Description:string

    @IsString()
    @IsOptional()
    Publisher:string

    @IsString()
    @IsOptional()
    Language:string

    @IsNumber()
    @IsOptional()
    Paperback:number
    
}