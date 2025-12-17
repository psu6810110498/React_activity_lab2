import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
export declare class BookService {
    private readonly bookRepository;
    constructor(bookRepository: Repository<Book>);
    create(createBookDto: CreateBookDto): Promise<CreateBookDto & Book>;
    findAll(): Promise<Book[]>;
    findOne(id: string): Promise<Book | null>;
    update(id: string, updateBookDto: UpdateBookDto): Promise<import("typeorm").UpdateResult>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
    incrementLikes(id: string): Promise<Book>;
}
