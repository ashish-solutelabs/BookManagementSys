import { Injectable, NotAcceptableException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { Book } from './book.interface';

@Injectable()
export class BookService {
    constructor(@InjectRepository(BookEntity) private repo:Repository<BookEntity>){}

    async create(books:Book,ISBN:number){
        const duplicateISBN = await this.repo.findOne({ISBN});

        if(duplicateISBN)
        {
            throw new NotAcceptableException("Duplicate ISBN number found");
        }
        else{
            return this.repo.save(books);
        }
    }


    findAllBook():Promise<BookEntity[]>{
        return  this.repo.find();
    }

    findBookByISBN(ISBN:number){
        return this.repo.findOne({ISBN});
    }

    findBookByBookName(BookName:string){
        return this.repo.findOne({BookName});
    }

    findBookByAuther(Auther:string){
        return this.repo.find({Auther})
    }

    findBookByLanguage(Language:string){
        return this.repo.find({Language});
    }

    async updateDataByISBN(ISBN:number,attrs:Partial<BookEntity>){
        const bookInfo = await this.repo.findOne({ISBN});
        if(!bookInfo){
            throw new NotFoundException("Book Doesn't exist in our database")
        }
        Object.assign(bookInfo,attrs);
        return this.repo.save(bookInfo);
    }
    async removeBookDataByISBN(ISBN:number)
    {
        const bookInfo = await this.repo.findOne({ISBN});
        if(!bookInfo){
            throw new NotFoundException("Book Doesn't exist in our database")
        }
        return this.repo.remove(bookInfo);
    }
}
