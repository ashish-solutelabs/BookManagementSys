import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entity/book.entity';


@Module({ 
  imports: [TypeOrmModule.forRoot({
    type: 'postgres', // type of our database
    host: 'localhost', // database host
    port: 5432, // database host
    username: 'postgres', // username
    password: '1230', // user passwords
    database: 'postgres', // name of our database,
    entities: [Book], // models will be loaded automatically 
    synchronize: true, // your entities wil
  }),BookModule],
})


export class AppModule {}
