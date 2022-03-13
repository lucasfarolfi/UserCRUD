import {diskStorage} from 'multer';

export default {
    storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) =>{
            const filename: string = `${Date.now()}-${file.originalname}`;

            cb(null, filename);
        },
        limits: { fileSize: 2 * 1024 * 1024 },
        fileFilter: (req, file, cb) =>{
            const allowedMimes: string[] = [
                'image/jpeg',
                'image/pjpeg',
                'image/png'
            ]

            if(allowedMimes.includes(file.mimetype)){
                cb(null, true);
            } else {
                cb(new Error("Tipo de arquivo inválido."));
            }
        }
    })
}