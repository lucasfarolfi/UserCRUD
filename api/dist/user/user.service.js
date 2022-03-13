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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_entity_1 = require("./entities/user.entity");
const typeorm_1 = require("typeorm");
const typeorm_2 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
let UserService = class UserService {
    constructor(userRepository, configService) {
        this.userRepository = userRepository;
        this.configService = configService;
    }
    async findAll() {
        let users = await this.userRepository.find();
        if (!users) {
            throw new common_1.NotFoundException("Nenhum usuário registrado");
        }
        return users;
    }
    async findOne(id) {
        let userFound = await this.userRepository.findOne(id);
        if (!userFound) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        return userFound;
    }
    async create(filepath, user) {
        let foundEmail = await this.userRepository.findOne({ email: user.email });
        if (foundEmail) {
            throw new common_1.HttpException("E-mail já cadastrado", 409);
        }
        let port = this.configService.get('PORT');
        let newUser = await this.userRepository.create(Object.assign(Object.assign({}, user), { photo: `http://localhost:${port}/${filepath}` }));
        return await this.userRepository.save(newUser);
    }
    async delete(id) {
        let userDeleted = await this.userRepository.findOne(id);
        if (!userDeleted) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        return await this.userRepository.remove(userDeleted);
    }
    async update(id, user) {
        let userUpdated = await this.userRepository.preload(Object.assign({ id: Number(id) }, user));
        if (!userUpdated) {
            throw new common_1.NotFoundException("Usuário não encontrado");
        }
        let foundEmail = await this.userRepository.findOne({ email: user.email, id: (0, typeorm_1.Not)((0, typeorm_1.Equal)(Number(id))) });
        if (foundEmail) {
            throw new common_1.HttpException("E-mail já cadastrado", 409);
        }
        return await this.userRepository.save(userUpdated);
    }
};
UserService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        config_1.ConfigService])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map