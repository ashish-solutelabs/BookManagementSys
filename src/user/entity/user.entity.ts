import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import * as bcrypt from 'bcrypt';
import { Book } from "src/book/entity/book.entity";


@Entity('user')
@Unique(['email'])
export class User{
    @PrimaryGeneratedColumn()
    id:number

    @Column()
    
    email:string

    @Column()
    password:string

    @OneToMany(type => Book, book => book.user, { eager: true })
    books: Book[];
    
    async validatePassword(password: string): Promise<boolean> {
        return await bcrypt.compare(password, this.password);
    }
}