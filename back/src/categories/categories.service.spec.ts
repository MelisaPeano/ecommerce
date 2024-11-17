import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { Category } from '../entitys/categories.entity';
import { DeepPartial} from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';


describe('CategoriesService', () => {
  let service: CategoriesService;
  let mockCategories;

  beforeEach(async () => {
    mockCategories = {
      find: jest.fn().mockResolvedValue([]), // Simula el método `find`
      findOne: jest.fn().mockResolvedValue(null), // Simula el método `findOne`
      create: jest.fn((entityLike: DeepPartial<Category> | DeepPartial<Category>[]) => {
        if (Array.isArray(entityLike)) {
          return entityLike.map((item) => ({ ...item })); // Devuelve un arreglo de categorías
        }
        return { ...entityLike }; // Devuelve una única categoría
      }), // Simula el método `create`
      save: jest.fn((category) => Promise.resolve({ id: 1, ...category })), // Simula el método `save`
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService,
        {
          provide: getRepositoryToken(Category), // Token del repositorio
          useValue: mockCategories, // Reemplaza el repositorio con el mock
        },
      ],
      
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should return categories', async () => {
    const categoriesMock = [{ id: 1, name: 'Category 1' }];
    (mockCategories.find as jest.Mock).mockResolvedValue(categoriesMock);

    const result = await service.getCategories();
    expect(mockCategories.find).toHaveBeenCalled(); // Verifica que `find` fue llamado
    expect(result).toEqual(categoriesMock); // Verifica el resultado
  });

  it('should add new categories', async () => {
    const categoriesToAdd = [{ name: 'New Category' }];
    (mockCategories.findOne as jest.Mock).mockResolvedValue(null); // Simula que no existe la categoría

    const result = await service.addCategories(categoriesToAdd);

    expect(mockCategories.findOne).toHaveBeenCalledWith({ where: { name: 'New Category' } });
    expect(mockCategories.create).toHaveBeenCalledWith({ name: 'New Category' });
    expect(mockCategories.save).toHaveBeenCalled();
    expect(result).toHaveLength(1);
    expect(result[0]).toHaveProperty('id', 1);
    expect(result[0]).toHaveProperty('name', 'New Category');
  });
});
