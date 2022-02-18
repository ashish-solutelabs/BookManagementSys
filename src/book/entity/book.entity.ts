import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity('book')
export class Book{
    @PrimaryGeneratedColumn()
    id:number;

    @Column({ type: "bigint",unique:true})
    isbn: number;

    @Column()
    bookName: string;

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
}

