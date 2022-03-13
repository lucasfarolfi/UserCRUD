"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = require("multer");
exports.default = {
    storage: (0, multer_1.diskStorage)({
        destination: './uploads',
        filename: (req, file, cb) => {
            const filename = `${Date.now()}-${file.originalname}`;
            cb(null, filename);
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter: (req, file, cb) => {
            const allowedMimes = [
                'image/jpeg',
                'image/pjpeg',
                'image/png'
            ];
            if (allowedMimes.includes(file.mimetype)) {
                cb(null, true);
            }
            else {
                cb(new Error("Tipo de arquivo inválido."));
            }
        }
    })
};
//# sourceMappingURL=uploadStorage.js.map