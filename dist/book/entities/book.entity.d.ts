import { User } from '../../users/entities/user.entity';
import { BookCategory } from '../../book-category/entities/book-category.entity';
export declare class Book {
    id: string;
    title: string;
    author: string;
    price: number;
    likeCount: number;
    likedBy: User[];
    category: BookCategory;
    categoryId: string;
}
