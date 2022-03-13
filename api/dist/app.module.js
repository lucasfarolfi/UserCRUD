"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
const user_module_1 = require("./user/user.module");
const database_config_1 = require("./database.config");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const typeorm_1 = require("@nestjs/typeorm");
const Config = config_1.ConfigModule.forRoot({
    isGlobal: true,
    load: [config_2.config]
});
const ServeStatic = serve_static_1.ServeStaticModule.forRoot({
    rootPath: (0, path_1.join)(__dirname, '..', 'uploads')
});
const TypeORMConnection = typeorm_1.TypeOrmModule.forRootAsync({
    useClass: database_config_1.DatabaseConfig,
    imports: [config_1.ConfigModule]
});
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [user_module_1.UserModule, TypeORMConnection, ServeStatic, Config],
        controllers: [],
        providers: [],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map