"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TypeORMConnection = void 0;
const typeorm_1 = require("@nestjs/typeorm");
exports.TypeORMConnection = typeorm_1.TypeOrmModule.forRoot({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "123456",
    database: "user_crud",
    autoLoadEntities: true,
    synchronize: true
});
//# sourceMappingURL=databaseConnection.js.map