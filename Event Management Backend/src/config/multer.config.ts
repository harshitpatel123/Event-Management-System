import { diskStorage } from "multer";

export const multerOptions = (maxSize: number, match : any) => {
    return {
        limits: {
            fileSize: maxSize,
        },
        fileFilter: (req: any, file: any, cb: any) => {
            // if(req.files && req.files.length > maxFiles){
            //     cb(new Error(`Exceeded maximum number of files (${maxFiles})`), false);
            // }
            if (file.mimetype.match(match)) {
                cb(null, true);
            } else {
                cb(new Error('Unsupported file type'), false);
            }
        },
        
    }
}
