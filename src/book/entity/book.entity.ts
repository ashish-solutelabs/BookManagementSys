import { User } from "src/user/entity/user.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";


@Entity('book')
export class Book{
    @PrimaryGeneratedColumn()
    book_id:number;

    @Column({unique:true})
    isbn: string;

    @Column()
    bookname: string;

    @Column()
    auther: string;

    @Column()
    description:string

    @Column()
    publisher :string
    
    @Column()
    language :string

    @Column()
    paperback:number

    @Column()
    price:number

    @ManyToOne(type => User, user => user.books, { eager: false })
    @JoinColumn()
    user: User;

    @Column()
    userId: number;


}
