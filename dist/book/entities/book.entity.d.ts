import { BookCategory } from '../../book-category/entities/book-category.entity';
export declare class Book {
    id: string;
    title: string;
    author: string;
    price: number;
    likeCount: number;
    category: BookCategory;
    categoryId: string;
}
