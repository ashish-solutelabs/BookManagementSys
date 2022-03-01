import { ConflictException, Injectable, NotAcceptableException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entity/user.entity';
import { Repository } from 'typeorm';
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
        // const isbn = body.isbn;
        const { isbn } = body

        const duplicateISBN = await this.repo.findOne( {isbn} );

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

        console.log(book)
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

        const bookInfo = await this.repo.findOne(book_id);

        if (!bookInfo) {
            throw new NotFoundException("Book Doesn't exist in our database")
        }
        const book = {
            isbn :bookInfo.isbn,
            bookname : body.bookname?bookInfo.bookname:body.bookname,
            auther: body.auther?bookInfo.auther : body.auther,
            description : body.description?bookInfo.bookname:body.description,
            publisher : body.publisher?bookInfo.publisher:body.publisher,
            language : body.language?bookInfo.language:body.language,
            paperback : body.paperback?bookInfo.paperback:body.paperback,
            price : body.price?bookInfo.price:body.price,
            user : user,
        }        
        
        const status = await this.repo.save(book);

        if (!status) {
            throw new NotAcceptableException("Data is not store in server");
        }
        return {
            success: true,
            message: `${status.book_id} book is Update Successfully`
        }
    }

    async removeBookDataByISBN(book_id:number)
        {
            const bookInfo = await this.repo.findOne(book_id);

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
