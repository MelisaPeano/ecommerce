import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { userResponseDto } from '../users/dto/userResponse.dto';
import { Roles } from '../enums/role.enum';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;
  
  beforeEach(async () => {
    mockUsersService = {
      createUser: jest.fn((user: CreateUserDto) => Promise.resolve({
        id: 'mock-id',
        name: 'mock-name',
        phone: 12345678,
        email: 'mock-email@example.com',
        password: 'mock-password',
        role: 'user' as Roles,
        city: 'mock-city',
        address: 'mock-address',
        country: 'mock-country',
        orders: [],
      })),
      loginUser: jest.fn((user: LoginUserDto) => Promise.resolve({
        user: {
          id: 'mock-id',
          email: 'mock-email@example.com',
          role: 'user' as Roles,
        },
        token: 'mockToken',
      }),),
    };
      
    const module: TestingModule = await Test.createTestingModule({
      providers: [AuthService,
        {
          provide: UsersService,
          useValue: mockUsersService,}
      ], // Le agrego los providers que necesita AUTHSERVICE
    }).compile();

    service = module.get<AuthService>(AuthService); // instancia del servicio que quiero probar
  });
  const mockLoginUser = new LoginUserDto({
    email: 'a@a.com',
    password: '123456',
  });

  const mockCreateUser = new CreateUserDto({
    name: 'mock-name',
    phone: 12345678,
    email: 'a@a.com',
    password: '123456',
  });


  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    const userDto = new CreateUserDto(mockCreateUser); // Simula un DTO de usuario
    const result = await service.createUser(userDto);
  
    expect(mockUsersService.createUser).toHaveBeenCalledWith(userDto); // Verifica que se llamó con el DTO
    expect(result).toEqual(expect.objectContaining({
      id: 'mock-id',
      name: 'mock-name',
      email: 'mock-email@example.com',
      phone: 12345678,
    }));
  });
  it('should login a user', async () => {
    const loginDto = new LoginUserDto(mockLoginUser); // Simula un DTO de login
    const result = await service.loginUser(loginDto);
  
    expect(mockUsersService.loginUser).toHaveBeenCalledWith(loginDto); // Verifica que se llamó con el DTO
    expect(result).toEqual({    user: {
      id: 'mock-id',
      email: 'mock-email@example.com',
      role: 'user' as Roles,
    },
    token: 'mockToken',
  });
  });
  it('should throw an error if createUser fails', async () => {
    (mockUsersService.createUser as jest.Mock).mockRejectedValue(new Error('User creation failed')); // Simula un error

    await expect(service.createUser(new CreateUserDto(mockCreateUser))).rejects.toThrow('Method not implemented.'); // Verifica que lanza el error correcto
  });
});
