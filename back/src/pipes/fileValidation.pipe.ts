import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';
import { Express } from 'express';

@Injectable()
export class FileValidationPipe implements PipeTransform {
  private readonly allowedMimeTypes = ['image/jpeg', 'image/png', 'image/gif'];
  private readonly maxFileSize = 200 * 1024; // 200 KB

  transform(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('No file provided');
    }
    if (file.size > this.maxFileSize) {
      throw new BadRequestException(`File size exceeds the limit of 200 KB`);
    }

    // Validar el tipo MIME del archivo
    if (!this.allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(
        `Invalid file type. Allowed types are: ${this.allowedMimeTypes.join(', ')}`,
      );
    }

    return file;
  }
}
