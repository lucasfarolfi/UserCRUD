import { UserService } from './user.service';
export declare class UserController {
    private readonly usersService;
    constructor(usersService: UserService);
    findAll(): Promise<import("./entities/user.entity").User[]>;
    findOne(id: string): Promise<import("./entities/user.entity").User>;
    create(file: any, createUserDto: any): Promise<import("./entities/user.entity").User>;
    update(updateUserDto: any, id: string): Promise<import("./entities/user.entity").User>;
    delete(id: string): Promise<import("./entities/user.entity").User>;
}
