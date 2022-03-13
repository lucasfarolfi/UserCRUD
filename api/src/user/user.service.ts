import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { Equal, Not, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User) 
        private readonly userRepository: Repository<User>,
        private readonly configService: ConfigService
        ){}

    async findAll(){
        let users = await this.userRepository.find();
        if(!users){
            throw new NotFoundException("Nenhum usuário registrado");
        }
        return users;
    }

    async findOne(id: string){
        let userFound = await this.userRepository.findOne(id);
        if(!userFound){
            throw new NotFoundException("Usuário não encontrado");
        }
        return userFound;
    }

    async create(filepath: string, user : CreateUserDto){
        let foundEmail = await this.userRepository.findOne({email: user.email});
        
        if(foundEmail){
            throw new HttpException("E-mail já cadastrado", 409);
        }

        let port = this.configService.get('PORT');
        let newUser = await this.userRepository.create({...user, photo: `http://localhost:${port}/${filepath}`});
        return await this.userRepository.save(newUser);
    }

    async delete(id: string){
        let userDeleted = await this.userRepository.findOne(id);
        
        if(!userDeleted){
            throw new NotFoundException("Usuário não encontrado");
        }
        return await this.userRepository.remove(userDeleted);
    }

    async update(id: string, user : UpdateUserDto){
        let userUpdated = await this.userRepository.preload({id: Number(id), ...user});
        if(!userUpdated){
            throw new NotFoundException("Usuário não encontrado");
        }

        let foundEmail = await this.userRepository.findOne({email: user.email, id: Not(Equal(Number(id)))});
        if(foundEmail){
            throw new HttpException("E-mail já cadastrado", 409);
        }

        return await this.userRepository.save(userUpdated);
    }
}
