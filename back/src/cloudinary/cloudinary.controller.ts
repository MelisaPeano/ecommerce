import {
  Controller,
  Param,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';
import { FileValidationPipe } from 'src/pipes/fileValidation.pipe';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('files')
export class CloudinaryController {
  constructor(private readonly cloudinaryService: CloudinaryService) {} // como probar esta ruta
  @Post('/uploadImage/:id ')
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor('image'))
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile(FileValidationPipe)
    image: Express.Multer.File,
  ): Promise<UploadApiResponse> {
    return this.cloudinaryService.uploadImage(image);
  }
}
