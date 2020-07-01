import {Entity, PrimaryGeneratedColumn, Column, Unique, CreateDateColumn } from "typeorm";
import { Length } from 'class-validator';
import bcryptjs from 'bcryptjs';

@Entity({ name: 'user' })
@Unique(["taxId", "username"])
export default class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @Length(4, 50)
    name: string;

    @Column()
    @Length(4, 30)
    username: string;

    @Column()
    @Length(4, 20)
    password: string;

    @Column()
    @Length(4, 50)
    email: string;

    @Column()
    @Length(11, 14)
    taxId: string;

    @Column()
    @CreateDateColumn()
    createdAt: Date;

    hashPassword() {
        this.password = bcryptjs.hashSync(this.password, 8);
    }

    checkIfUnencryptedPasswordIsValid(unencryptedPassword: string): boolean {
        return bcryptjs.compareSync(unencryptedPassword, this.password);
    }
}
