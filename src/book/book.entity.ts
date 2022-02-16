import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@Entity()
export class BookEntity{
    @PrimaryGeneratedColumn()
    id:number;

    @Column()
    ISBN: number;

    @Column()
    BookName: string;

    @Column()
    Auther: string;

    @Column()
    Description:string

    @Column()
    Publisher :string
    
    @Column()
    Language :string

    @Column()
    Paperback:number
}

