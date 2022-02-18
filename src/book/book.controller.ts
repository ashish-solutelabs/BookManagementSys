import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationQuery } from './dto/paginationQuery.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
export class BookController {

    constructor(private bookService:BookService){}
    

    @Get()
    async findBookDetails(@Query() paginationQuery:PaginationQuery){
        const bookInfo  = await this.bookService.findBookDetails(paginationQuery)
        return bookInfo
    }

    @Get(':id')
    async findById(@Param() id:number){
        const bookInfo  = await this.bookService.findBookDetails(id)
        return bookInfo
    }

    @Post()
    async create(@Body() books:CreateBookDto){
        const status = await this.bookService.create(books);
        return status;
    }

    @Put(':id')
    async updateDataByISBN(@Param() id:number,@Body() body:UpdateBookDto){
        const bookInfo= await this.bookService.updateDataByISBN(id,body);
        return bookInfo;
    }

    @Delete(':id')
    async removeBookDataByISBN(@Param() id:number)
    {
        const status = await this.bookService.removeBookDataByISBN(id); 
        return status;
    }
}
