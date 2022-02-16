import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BookEntity } from './book.entity';
import { Book } from './book.interface';

@Injectable()
export class BookService {
    constructor(@InjectRepository(BookEntity) private repo:Repository<BookEntity>){}

    async create(books:Book):Promise<BookEntity>{
        return this.repo.save(books);
    }
    findAllBook():Promise<BookEntity[]>{
        return  this.repo.find();
    }

    findBookByISBN(ISBN:number){
        return this.repo.findOne({ISBN});
    }

    findBookByBookName(BookName:string){
        console.log("Bookname:",BookName)
        return this.repo.findOne({BookName});
    }

    findBookByAuther(Auther:string){
        console.log("Aurther: ",Auther)
        return this.repo.find({Auther})
    }

    findBookByLanguage(Language:string){
        return this.repo.find({Language});
    }

    async updateDataByISBN(ISBN:number,attrs:Partial<BookEntity>){
        const bookInfo = await this.repo.findOne({ISBN});
        if(!bookInfo){
            throw new Error("Book Doesn't exist in our database")
        }
        console.log("---------------")
        Object.assign(bookInfo,attrs);
        return this.repo.save(bookInfo);
    }
    async removeBookDataByISBN(ISBN:number)
    {
        const bookInfo = await this.repo.findOne({ISBN});
        if(!bookInfo){
            throw new Error("Book Doesn't exist in our database")
        }
        return this.repo.remove(bookInfo);
    }
}
