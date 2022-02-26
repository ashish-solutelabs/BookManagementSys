import { Module } from '@nestjs/common';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Book } from './book/entity/book.entity';
import { UserModule } from './user/user.module';
import { User } from './user/entity/user.entity';
import { ConfigModule } from '@nestjs/config';

@Module({ 
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRoot({
    type: 'postgres',
    host: process.env.DATABASE_HOST, 
    port: +process.env.DATABASE_PORT, 
    username: process.env.DATABASE_USER, 
    password: process.env.DATABASE_PASSWORD, 
    database: process.env.DATABASE_NAME,
    entities: [Book,User], 
    synchronize: true,
  }),BookModule, UserModule],
})

export class AppModule {}
