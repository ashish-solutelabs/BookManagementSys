import {  IsOptional, IsString } from "class-validator";

export class PaginationQuery{
    
    @IsString()
    @IsOptional()
    isbn:string
    
    @IsString()
    @IsOptional()
    bookname:string

    @IsString()
    @IsOptional()
    auther:string


}