import { Module } from '@nestjs/common';
import { BookService } from './book.service';
import { BookController } from './book.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './entity/book.entity';
import { UserModule } from 'src/user/user.module';


@Module({
  imports:[TypeOrmModule.forFeature([Book]),UserModule],
  providers: [BookService],
  controllers: [BookController]
})
export class BookModule {}
