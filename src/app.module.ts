import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entity/book.entity';


@Module({ 
  imports: [TypeOrmModule.forRoot({
    type: 'postgres',
    host: 'localhost', 
    port: 5432, 
    username: 'postgres', 
    password: '1230', 
    database: 'postgres',
    entities: [Book], 
    synchronize: true,
  }),BookModule],
})


export class AppModule {}
