import { PipeTransform } from '@nestjs/common';
export declare class FileValidationPipe implements PipeTransform {
    private readonly allowedMimeTypes;
    private readonly maxFileSize;
    transform(file: Express.Multer.File): Express.Multer.File;
}
