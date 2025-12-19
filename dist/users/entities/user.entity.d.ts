import { Book } from '../../book/entities/book.entity';
export declare enum UserRole {
    ADMIN = "ADMIN",
    USER = "USER"
}
export declare class User {
    id: string;
    email: string;
    password: string;
    role: UserRole;
    likedBooks: Book[];
    createdAt: Date;
    updatedAt: Date;
}
