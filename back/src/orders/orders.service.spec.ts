import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { UsersService } from '../users/users.service';
import { ProductsService } from '../products/products.service';
import { Repository } from 'typeorm';
import { Order } from '../entitys/order.entity';
import { OrderDetail } from '../entitys/orderDetails.entity';
import { getRepositoryToken } from '@nestjs/typeorm';
import { v4 as uuid } from 'uuid';

describe('OrdersService', () => {
  let service: OrdersService;
  let usersService: Partial<UsersService>;
  let productsService: Partial<ProductsService>;
  let orderRepository: Partial<Repository<Order>>;
  let orderDetailsRepository: Partial<Repository<OrderDetail>>;

  beforeEach(async () => {
    usersService = { // Funciones simuladas para que cada test genere su respuesta o modifique la funcion
      getUsersById: jest.fn(),
    };
    productsService = {
      getProductById: jest.fn(),
      updateProduct: jest.fn(),
    };
    orderRepository = {
      create: jest.fn(),
      save: jest.fn(),
      findOneBy: jest.fn(),
    };
    orderDetailsRepository = {
      create: jest.fn(),
      save: jest.fn(),
      find: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersService,
        { provide: UsersService, useValue: usersService },
        { provide: ProductsService, useValue: productsService },
        { provide: getRepositoryToken(Order), useValue: orderRepository },
        { provide: getRepositoryToken(OrderDetail), useValue: orderDetailsRepository },
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('debería agregar un pedido correctamente', async () => {
    const mockUserId = 'mock-user-id';
    const mockProductsId = [{ productId: 'mock-product-id' }];
  
    // Mock de servicios y repositorios
    (usersService.getUsersById as jest.Mock).mockResolvedValue({ id: mockUserId });
    (productsService.getProductById as jest.Mock).mockResolvedValue({
      id: 'mock-product-id',
      stock: 10,
      price: 100,
    });
    (productsService.updateProduct as jest.Mock).mockResolvedValue({});
    (orderDetailsRepository.create as jest.Mock).mockImplementation((orderDetail) => orderDetail);
    (orderDetailsRepository.save as jest.Mock).mockResolvedValue({});
    (orderRepository.create as jest.Mock).mockImplementation((order) => order);
    (orderRepository.save as jest.Mock).mockResolvedValue({});
  
    const result = await service.addOrder(mockUserId, mockProductsId);
  
    expect(usersService.getUsersById).toHaveBeenCalledWith(mockUserId);
    expect(productsService.getProductById).toHaveBeenCalledWith('mock-product-id');
    expect(productsService.updateProduct).toHaveBeenCalledWith('mock-product-id', expect.anything());
    expect(orderDetailsRepository.create).toHaveBeenCalled();
    expect(orderDetailsRepository.save).toHaveBeenCalled();
    expect(orderRepository.create).toHaveBeenCalled();
    expect(orderRepository.save).toHaveBeenCalled();
    expect(result).toEqual({
      order: expect.any(Object),
      price: 100,
      orderDetail: expect.any(String),
    });
  });
  it('debería lanzar un error si no se proporcionan productos', async () => {
    await expect(service.addOrder('mock-user-id', null)).rejects.toThrow(
      'No se han agregado productos',
    );
  });
  
  it('debería lanzar un error si no se proporciona usuario', async () => {
    await expect(service.addOrder(null, [{ productId: 'mock-product-id' }])).rejects.toThrow(
      'No se ha agregado un usuario',
    );
  });
  it('debería devolver un pedido correctamente', async () => {
    const mockOrderId = 'mock-order-id';
    const mockOrder = {
      id: mockOrderId,
      user_id: 'mock-user-id',
      date: new Date(),
      user: { id: 'mock-user-id', name: 'Mock User' },
      orderDetail: { id: 'mock-detail-id', price: 200, products: [] },
    };
    const mockOrderDetail = [
      { id: 'mock-detail-id', price: 200, products: [] },
    ];
  
    (orderRepository.findOneBy as jest.Mock).mockResolvedValue(mockOrder);
    (orderDetailsRepository.find as jest.Mock).mockResolvedValue(mockOrderDetail);
  
    const result = await service.getOrders(mockOrderId);
  
    expect(orderRepository.findOneBy).toHaveBeenCalledWith({ id: mockOrderId });
    expect(orderDetailsRepository.find).toHaveBeenCalledWith({
      where: { id: mockOrderId },
      relations: ['orderDetail', 'products'],
    });
    expect(result).toEqual(mockOrder);
  });
});
