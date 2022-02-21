import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entity/book.entity';

@Injectable()
export class BookService {

    constructor(@InjectRepository(Book) private repo: Repository<Book>) {}

    async findBookDetails(paginationQuery:any)
    { 
        const bookInfo =  await this.repo.find(paginationQuery)

        if (!bookInfo){
            throw new NotFoundException("Book doesn't found in database")
        }
        return {
            success: "true",
            message: bookInfo
        }
    }

    async create(books: any) 
    {
        // const isbn = books.isbn;
        const {isbn} =books

        const duplicateISBN = await this.repo.findOne(isbn);

        if (duplicateISBN) {
            throw new NotAcceptableException("Duplicate ISBN number found");
        }

        const status = await this.repo.save(books);

        if (!status) {
            throw new NotAcceptableException("Data is not store in server");
        }
        return {
            success: true,
            message: `${books.bookName} is successfully save In database`
        }
    }

    async updateDataByISBN(id: number, attrs: Partial<Book>) {
        const bookInfo = await this.repo.findOne(id);

        if (!bookInfo) {
            throw new NotFoundException("Book Doesn't exist in our database")
        }

        Object.assign(bookInfo, attrs);
        
        const status = await this.repo.save(bookInfo);

        if (!status) {
            throw new NotAcceptableException("Data is not store in server");
        }
        return {
            success: true,
            message: `${status.id} book is Update Successfully`
        }
    }

    async removeBookDataByISBN(id:number)
        {
            const bookInfo = await this.repo.findOne(id);
            if(!bookInfo){
                throw new NotFoundException("Book Doesn't exist in our database")
            }
            const status= await this.repo.remove(bookInfo);

            if (!status) {
                throw new NotAcceptableException("Data is not store in server");
            }
            return {
                success: true,
                message: `${bookInfo.bookName} is successfully save In database`
            }
    }
}
