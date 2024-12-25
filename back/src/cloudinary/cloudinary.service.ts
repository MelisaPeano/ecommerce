import { Inject, Injectable } from '@nestjs/common';
import { UploadApiResponse, v2 as cloudinary, v2 } from 'cloudinary';
import * as toStream from 'buffer-to-stream';
import { ProductsService } from 'src/products/products.service';


@Injectable()
export class CloudinaryService {
  constructor(
    @Inject('CLOUDINARY')private readonly productRepository: ProductsService ) {}
  async uploadImage(file: Express.Multer.File, id: string): Promise<UploadApiResponse> {
    const foundProducts = await this.productRepository.getProductById(id);
    if (!foundProducts) { 
      throw new Error('Producto no encontrado');
    }
    const uploadImage: UploadApiResponse = await new Promise((resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        { resource_type: 'auto' },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        },
      );
      toStream(file.buffer).pipe(upload);
    });
      foundProducts.imgUrl = uploadImage.secure_url;
      await this.productRepository.updateProduct(foundProducts.id, foundProducts);
      return uploadImage;
  }
}
