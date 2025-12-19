import { BookService } from './book.service';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { User } from '../users/entities/user.entity';
export declare class BookController {
    private readonly bookService;
    constructor(bookService: BookService);
    findAll(): Promise<import("./entities/book.entity").Book[]>;
    findOne(id: string): Promise<import("./entities/book.entity").Book | null>;
    create(createBookDto: CreateBookDto): Promise<CreateBookDto & import("./entities/book.entity").Book>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    likeBook(id: string, user: User): Promise<import("./entities/book.entity").Book>;
}
