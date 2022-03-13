import { Body, Controller, Delete, Get, Param, Patch, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UserService } from './user.service';
import uploadStorage from '../utils/uploadStorage';

@Controller('users')
export class UserController {
    constructor(private readonly usersService: UserService){}

    @Get()
    findAll(){
        return this.usersService.findAll();
    }

    @Get(':id')
    findOne(@Param('id') id: string){
        return this.usersService.findOne(id);
    }

    @Post()
    @UseInterceptors(FileInterceptor('file', uploadStorage))
    create(@UploadedFile() file: any,@Body() createUserDto: any){
        return this.usersService.create(file.filename, createUserDto);
    }

    @Patch(':id')
    update(@Body() updateUserDto: any, @Param('id') id:string){
        return this.usersService.update(id, updateUserDto);
    }

    @Delete(':id')
    delete(@Param('id') id:string){
        return this.usersService.delete(id)
    }
}
