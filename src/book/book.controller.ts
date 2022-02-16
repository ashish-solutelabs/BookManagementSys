import { Body, Controller, Delete, Get, Patch, Post, Query, Res } from '@nestjs/common';
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
        console.log(body)
        const status = await this.bookService.create(body);
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

        console.log(bookInfo)
        res.status(200).send({
            success:true,
            message:bookInfo
        });
    }


    @Get()
    async findBookByISBN(@Query('ISBN') ISBN:number,@Res() res:Response){
        console.log(ISBN)
        const bookInfo= await this.bookService.findBookByISBN(ISBN);
        console.log(bookInfo)
        res.status(200).send(bookInfo);
        
    }

    @Get("/findBookByBookName")
    async findBookByBookName(@Query('BookName') BookName:string,@Res() res:Response){
        console.log(BookName)
        const bookInfo= await this.bookService.findBookByBookName(BookName);
        console.log(bookInfo)
        res.status(200).send(bookInfo);
    }

    @Get('/findBookByAuther')
    async findBookByAuther(@Query('Auther') auther:string,@Res() res:Response){
        console.log(auther)
        const bookInfo= await this.bookService.findBookByAuther(auther);
        console.log(bookInfo)
        res.status(200).send(bookInfo);
    }

    @Patch('/updateDataByISBN')
    async updateDataByISBN(@Query('ISBN') ISBN:number,@Body() body:updateBookDto,@Res() res:Response){
        console.log(ISBN,body)
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
        console.log("remove")
        res.status(200).send({
            success: true,
            message: `${ISBN} book is remove successfully`
        })
    }
}
