import { IsNumber, IsOptional, IsString } from "class-validator";

export class UpdateBookDto{
    @IsString()
    @IsOptional()
    bookname:string

    @IsString()
    @IsOptional()
    auther:string
    
    @IsString()
    @IsOptional()
    description:string

    @IsString()
    @IsOptional()
    publisher:string

    @IsString()
    @IsOptional()
    language:string

    @IsNumber()
    @IsOptional()
    paperback:number

    @IsNumber()
    @IsOptional()
    price:number
}