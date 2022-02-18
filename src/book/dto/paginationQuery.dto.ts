import { IsNumber, IsOptional, IsString } from "class-validator";

export class PaginationQuery{
    
    @IsString()
    @IsOptional()
    isbn:number
    
    @IsString()
    @IsOptional()
    bookName:string

    @IsString()
    @IsOptional()
    auther:string
}