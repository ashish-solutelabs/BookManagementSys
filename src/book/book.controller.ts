import { Body, Controller, Delete, Get, Param, Post, Put, Query, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/user/decorator/current-user.decorator';
import { User } from 'src/user/entity/user.entity';
import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationQuery } from './dto/paginationQuery.dto';
import { UpdateBookDto } from './dto/update-book.dto';

@Controller('book')
@UseGuards(AuthGuard())
export class BookController {

    constructor(private bookService:BookService){} 

    @Get()
    async findBookDetails(@Query() query:PaginationQuery,@GetUser() user:User){
        return await this.bookService.findBookDetails(query,user)
    }

    @Get(':id')
    async findById(@Param('id') id:number,@GetUser() user:User){
        return await this.bookService.findByUserId(id,user)
    }

    @Post()
    async create(@Body() book:CreateBookDto, @GetUser() user:User){
        return await this.bookService.create(book,user);
    }

    @Put(':id')
    async updateDataByISBN(@Param("id") id:number,@Body() body:UpdateBookDto,@GetUser() user:User){
        return await this.bookService.updateDataByISBN(id,body,user);
    }

    @Delete(':id')
    async removeBookDataByISBN(@Param('id') id:number,@GetUser() user:User)
    {
        return await this.bookService.removeBookDataByISBN(id,user); 
    }
}
