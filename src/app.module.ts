import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BookModule } from './book/book.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookEntity } from './book/book.entity';



@Module({ 
  imports: [TypeOrmModule.forRoot({
    type:'sqlite',
    database:'db.sqlite',
    entities:[BookEntity],
    synchronize:true
  }),BookModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
