"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const book_entity_1 = require("./entities/book.entity");
const user_entity_1 = require("../users/entities/user.entity");
let BookService = class BookService {
    bookRepository;
    constructor(bookRepository) {
        this.bookRepository = bookRepository;
    }
    create(createBookDto) {
        return this.bookRepository.save(createBookDto);
    }
    findAll() {
        return this.bookRepository.find({
            relations: ['category']
        });
    }
    findOne(id) {
        return this.bookRepository.findOne({
            where: { id },
            relations: ['category'],
        });
    }
    update(id, updateBookDto) {
        return this.bookRepository.update(id, updateBookDto);
    }
    remove(id) {
        return this.bookRepository.delete(id);
    }
    async toggleLike(id, userId) {
        const book = await this.bookRepository.findOne({
            where: { id },
            relations: ['likedBy'],
        });
        if (!book) {
            throw new Error('Book not found');
        }
        const userIndex = book.likedBy.findIndex((user) => user.id === userId);
        if (userIndex !== -1) {
            book.likedBy.splice(userIndex, 1);
            book.likeCount -= 1;
        }
        else {
            const user = new user_entity_1.User();
            user.id = userId;
            book.likedBy.push(user);
            book.likeCount += 1;
        }
        return this.bookRepository.save(book);
    }
};
exports.BookService = BookService;
exports.BookService = BookService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(book_entity_1.Book)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], BookService);
//# sourceMappingURL=book.service.js.map