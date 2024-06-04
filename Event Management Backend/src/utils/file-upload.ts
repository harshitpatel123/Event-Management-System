import { join } from "path";
import * as fs from "fs";

const dir = join(__dirname, '..', '..', '/uploads/')

export type File = Express.Multer.File;

export interface MultipleFiles {
    [key: string]: File;
}

const checkSizes = (mimetype: string) => {
    if (mimetype.includes('image')) {
        return 1000000; // 10 MB
    } else if (mimetype.includes('csv')) {
        return 500000; // 5 MB
    } else if (mimetype.match(/pdf|doc|docx/)) {
        return 2000000; // 20 MB
    }
}

const directoy = (mimetype: string) => {
    if (mimetype.includes('image')) {
        return '/images/';
    } else if (mimetype.includes('csv')) {
        return '/csv/';
    } else if (mimetype.match(/pdf|doc|docx/)) {
        return '/documents/';
    }
}

const validFileType = (file: File, fileType: string) => {
    return file.mimetype.match(fileType);
}

const singleFileUpload = (file: File, type: string) => {
    if (!validFileType(file, type)) {
        throw new Error('Invalid file type')
    }

    if (file.size > checkSizes(file.mimetype)) {
        throw new Error('File size is too large')
    }

    const FILENAME = file.originalname;
    const FILEPATH = join(dir, directoy(file.mimetype)) + FILENAME;
    try {
        fs.writeFileSync(FILEPATH, file.buffer);
        return FILEPATH;
    } catch (error) {
        throw new Error(error);
    }
}

const multipleFileUpload = (files: MultipleFiles, type: string) => {
    const FILEPATHS = Object.keys(files).map(key => { return ({ key: singleFileUpload(files[key][0], type) }) })
    return FILEPATHS;
}

const multipleFilesUpload = (files: Array<File>, type: string) => {
    const FILEPATHS = files.map(file => singleFileUpload(file, type));
    return FILEPATHS;
}

export { singleFileUpload, multipleFileUpload, multipleFilesUpload };