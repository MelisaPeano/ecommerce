import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { UserResponseDto } from '../users/dto/userResponse.dto';
import { Roles } from '../enums/role.enum';
import { CreateUserDto } from '../users/dto/createUser.dto';
import { LoginUserDto } from '../users/dto/loginUser.dto';

describe('AuthService', () => {
  let service: AuthService;
  let mockUsersService: Partial<UsersService>;
  
  beforeEach(async () => {
    mockUsersService = {
      createUser: jest.fn((user: CreateUserDto) => Promise.resolve(new UserResponseDto(user))),
      loginUser: jest.fn((user: LoginUserDto) => Promise.resolve({
        user: {
          id: 'mock-id',
          email: 'mock-email@example.com',
          role: [Roles.USER],
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

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
  it('should create a user', async () => {
    const userDto = new CreateUserDto(); // Simula un DTO de usuario
    const result = await service.createUser(userDto);
  
    expect(mockUsersService.createUser).toHaveBeenCalledWith(userDto); // Verifica que se llamó con el DTO
    expect(result).toBeInstanceOf(UserResponseDto); // Verifica que devuelve un DTO de respuesta
  });
  it('should login a user', async () => {
    const loginDto = new LoginUserDto(); // Simula un DTO de login
    const result = await service.loginUser(loginDto);
  
    expect(mockUsersService.loginUser).toHaveBeenCalledWith(loginDto); // Verifica que se llamó con el DTO
    expect(result).toEqual({    user: {
      id: 'mock-id',
      email: 'mock-email@example.com',
      role: [Roles.USER],
    },
    token: 'mockToken',
  });
  });
  it('should throw an error if createUser fails', async () => {
    (mockUsersService.createUser as jest.Mock).mockRejectedValue(new Error('User creation failed')); // Simula un error

    await expect(service.createUser(new CreateUserDto())).rejects.toThrow('Method not implemented.'); // Verifica que lanza el error correcto
  });
});
