import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { ConfigService } from '@nestjs/config';
export declare class UserService {
    private readonly userRepository;
    private readonly configService;
    constructor(userRepository: Repository<User>, configService: ConfigService);
    findAll(): Promise<User[]>;
    findOne(id: string): Promise<User>;
    create(filepath: string, user: CreateUserDto): Promise<User>;
    delete(id: string): Promise<User>;
    update(id: string, user: UpdateUserDto): Promise<User>;
}
