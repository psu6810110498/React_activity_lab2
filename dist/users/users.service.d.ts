import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
export declare class UsersService {
    private userRepository;
    constructor(userRepository: Repository<User>);
    onModuleInit(): Promise<void>;
    create(createUserDto: CreateUserDto): Promise<User>;
    findOneByEmail(email: string): Promise<User | null>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<import("typeorm").UpdateResult>;
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User | null>;
    remove(id: string): Promise<import("typeorm").DeleteResult>;
}
