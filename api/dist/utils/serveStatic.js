"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ServeStatic = void 0;
const serve_static_1 = require("@nestjs/serve-static");
const path_1 = require("path");
exports.ServeStatic = serve_static_1.ServeStaticModule.forRoot({
    rootPath: (0, path_1.join)(__dirname, '..', 'uploads')
});
//# sourceMappingURL=serveStatic.js.map