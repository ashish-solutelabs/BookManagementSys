import { Body, Controller, Delete, Get, NotFoundException, Patch, Post, Query, Res } from '@nestjs/common';
import { BookEntity } from './book.entity';
import { BookService } from './book.service';
import { Response } from 'express';
import { creatBookDto } from './dtos/create-book.dto';
import { updateBookDto } from './dtos/update-book.dto';

@Controller('book')
export class BookController {

    constructor(private bookService:BookService){}

    @Post('/addbook')
    async create(@Body() body:creatBookDto,@Res() res:Response){
        const status = await this.bookService.create(body,body.ISBN);
        if(!status)
        {
            throw new Error("Record Doesn't Inserted in Database")
        }
        else{
            res.status(200).send({
                success: true,
                message: `${body.ISBN} book is Insert in Database successfully`
            })
        }
    }


    @Get('/getAllBook')
    async findAllBook(@Res() res:Response){
        const bookInfo= await this.bookService.findAllBook();
        if (!bookInfo){
            throw new NotFoundException(`Book Is not Found in Our database`)
        }
        else{
            res.status(200).send({
                success: true,
                message: bookInfo
            })
        }
    }


    @Get()
    async findBookByISBN(@Query('ISBN') ISBN:number,@Res() res:Response){

        const bookInfo= await this.bookService.findBookByISBN(ISBN);
        if (!bookInfo){
            throw new NotFoundException(`${ISBN} Is not Found in Our database`)
        }
        else{
            res.status(200).send({
                success: true,
                message: bookInfo
            })
        }
        
    }

    @Get("/findBookByBookName")
    async findBookByBookName(@Query('BookName') BookName:string,@Res() res:Response){
        const bookInfo= await this.bookService.findBookByBookName(BookName);
        if (!bookInfo){
            throw new NotFoundException(`${BookName} Is not Found in Our database`)
        }
        else{
            res.status(200).send({
                success: true,
                message: bookInfo
            })
        }
    }

    @Get('/findBookByAuther')
    async findBookByAuther(@Query('Auther') auther:string,@Res() res:Response){
        const bookInfo= await this.bookService.findBookByAuther(auther);
        if (bookInfo.length==0){
            throw new NotFoundException(`${auther} Is not Found in Our database`)
        }
        else{
            res.status(200).send({
                success: true,
                message: bookInfo
            })
        }        
    }


    @Patch('/updateDataByISBN')
    async updateDataByISBN(@Query('ISBN') ISBN:number,@Body() body:updateBookDto,@Res() res:Response){
        const bookInfo= await this.bookService.updateDataByISBN(ISBN,body);
        res.status(200).send({
            success: true,
            message: `${ISBN} book is Update Successfully`
        })
    }
    

    @Delete('/removeBookByISBN')
    async removeBookDataByISBN(@Query('ISBN') ISBN:number,@Res() res:Response)
    {
        await this.bookService.removeBookDataByISBN(ISBN);
        res.status(200).send({
            success: true,
            message: `${ISBN} book is remove successfully`
        })
    }
}
