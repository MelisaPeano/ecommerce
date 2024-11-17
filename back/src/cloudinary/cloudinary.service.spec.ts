import { Test, TestingModule } from '@nestjs/testing';
import { CloudinaryService } from './cloudinary.service';
import { Readable } from 'typeorm/platform/PlatformTools';
import { v2 as cloudinary } from 'cloudinary';

jest.mock('cloudinary', () => ({
  v2: {
    uploader: {
      upload_stream: jest.fn(),
    },
  },
}));

describe('CloudinaryService', () => {
  let service: CloudinaryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CloudinaryService],
    }).compile();

    service = module.get<CloudinaryService>(CloudinaryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('debería subir una imagen y devolver el resultado', async () => {
    // Mock de `upload_stream`
    const mockUploadStream = jest.fn((options, callback) => {
      const stream = new Readable({
        read() {
          this.push(null); // Indica el final del stream.
        },
      });
      callback(null, { secure_url: 'http://example.com/image.jpg' }); // Simula la respuesta de Cloudinary.
      return stream;
    });
    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(mockUploadStream);

    // Simulamos un archivo Multer
    const mockFile = {
      buffer: Buffer.from('fake image content'),
    } as Express.Multer.File;

    const result = await service.uploadImage(mockFile);

    expect(mockUploadStream).toHaveBeenCalled();
    expect(result).toEqual({ secure_url: 'http://example.com/image.jpg' }); 
  });
  it('debería manejar un error de subida', async () => {
    const mockUploadStream = jest.fn((options, callback) => {
      const stream = new Readable({
        read() {
          this.push(null);
        },
      });
      callback(new Error('Upload error'), null); // Simula un error.
      return stream;
    });
    (cloudinary.uploader.upload_stream as jest.Mock).mockImplementation(mockUploadStream);

    const mockFile = {
      buffer: Buffer.from('fake image content'),
    } as Express.Multer.File;

    await expect(service.uploadImage(mockFile)).rejects.toThrow('Upload error');
    expect(mockUploadStream).toHaveBeenCalled(); // Verifica que el método se llamó.
  });
});
