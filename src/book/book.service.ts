import { ConflictException, Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import {  Repository } from 'typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { PaginationQuery } from './dto/paginationQuery.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {

    constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

    async findBookDetails(body:PaginationQuery,user:User)
    {  
        
        const bookInfo =  await this.repo.find(body)

        if (!bookInfo){
            throw new NotFoundException("Book doesn't found in database")
        }
        return {
            success: "true",
            message: bookInfo
        }
    }

    async findByUserId(book_id:number,user:User)
    {
        const bookInfo = await this.repo.findOne({ where: { book_id, userId: user.id } });
        
        if (!bookInfo){
            throw new NotFoundException("Book doesn't found in database")
        }
        return {
            success: "true",
            message: bookInfo
        }
    }

    async create(body:CreateBookDto, user: User) 
    {
        const { isbn } = body

        const duplicateISBN = await this.repo.findOne({ isbn });
        if (duplicateISBN) {
            throw new ConflictException("Duplicate ISBN number found");
        }
        const book = new Book();
        
        book.isbn = body.isbn;
        book.bookname = body.bookname;
        book.auther = body.auther;
        book.description = body.description;
        book.publisher = body.publisher;
        book.language = body.language;
        book.paperback = body.paperback;
        book.price = body.price;
        book.user = user;

        
        const status = await this.repo.save(book);
        delete book.user;

        if (!status) {
            throw new NotAcceptableException("Data is not store in server");
        }
        return {
            success: true,
            message: `${book.bookname} is successfully save In database`
        }
    }

    async updateDataByISBN(book_id: number, body: UpdateBookDto,user: User) {

        const bookInfo = await this.repo.findOne({ where: { book_id, userId: user.id } });

        if (!bookInfo) {
            throw new NotFoundException("Book Doesn't found")
        }

        const book = {
            isbn :bookInfo.isbn,
            bookname : body.bookname? body.bookname:bookInfo.bookname,
            auther: body.auther? body.auther:bookInfo.auther,
            description : body.description? body.description:bookInfo.bookname,
            publisher : body.publisher? body.publisher:bookInfo.publisher,
            language : body.language? body.language:bookInfo.language,
            paperback : body.paperback? body.paperback:bookInfo.paperback,
            price : body.price? body.price:bookInfo.price,
            user : user,
        }        
        Object.assign(bookInfo,book)
        const status = await this.repo.save(bookInfo);

        if (!status) {
            throw new NotAcceptableException("Data is not store in server");
        }
        return {
            success: true,
            message: `${status.book_id} book is Update Successfully`
        }
    }

    async removeBookDataByISBN(book_id:number,user:User){

            const bookInfo = await this.repo.findOne({ where: { book_id, userId: user.id } });

            if(!bookInfo){
                throw new NotFoundException("Book Doesn't exist in our database")
            }
            const status= await this.repo.remove(bookInfo);

            if (!status) {
                throw new NotAcceptableException("Data is not store in server");
            }
            return {
                success: true,
                message: `${bookInfo.bookname} is successfully save In database`
            }
    }
}
