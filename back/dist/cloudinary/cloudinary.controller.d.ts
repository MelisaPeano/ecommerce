import { UploadApiResponse } from 'cloudinary';
import { CloudinaryService } from './cloudinary.service';
export declare class CloudinaryController {
    private readonly cloudinaryService;
    constructor(cloudinaryService: CloudinaryService);
    uploadImage(id: string, image: Express.Multer.File): Promise<UploadApiResponse>;
}
