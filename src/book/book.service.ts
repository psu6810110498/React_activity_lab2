import { Injectable } from '@nestjs/common';
import { CreateBookDto } from './dto/create-book.dto';
import { UpdateBookDto } from './dto/update-book.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './entities/book.entity';
import { User } from '../users/entities/user.entity';

@Injectable()
export class BookService {
  constructor(
    @InjectRepository(Book)
    private readonly bookRepository: Repository<Book>,
  ) { }
  create(createBookDto: CreateBookDto) {
    return this.bookRepository.save(createBookDto);
  }

  findAll() {
    return this.bookRepository.find({
      relations: ['category']
    });
  }

  findOne(id: string) {
    return this.bookRepository.findOne({
      where: { id },
      relations: ['category'],
    });
  }

  update(id: string, updateBookDto: UpdateBookDto) {
    return this.bookRepository.update(id, updateBookDto);
  }

  remove(id: string) {
    return this.bookRepository.delete(id);
  }

  async toggleLike(id: string, userId: string) {
    const book = await this.bookRepository.findOne({
      where: { id },
      relations: ['likedBy'], // ตรวจสอบว่าใครกด Like ไปแล้วบ้าง
    });

    if (!book) {
      throw new Error('Book not found');
    }

    const userIndex = book.likedBy.findIndex((user) => user.id === userId);

    if (userIndex !== -1) {
      // Un-like: ถ้าเจอว่าเคย Like แล้ว ให้เอาออก
      book.likedBy.splice(userIndex, 1);
      book.likeCount -= 1;
    } else {
      // Like: ถ้ายังไม่เคย ให้เพิ่มเข้าไป
      const user = new User(); 
      user.id = userId;
      book.likedBy.push(user);
      book.likeCount += 1;
    }

    return this.bookRepository.save(book);
  }
}

