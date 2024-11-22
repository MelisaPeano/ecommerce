import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { hash } from 'bcrypt';
import { LoginUserDto } from 'src/users/dto/loginUser.dto';
import { Roles } from 'src/enums/role.enum';
import { CreateUserDto } from 'src/users/dto/createUser.dto';
import { AuthService } from './auth.service';
describe('AuthController', () => {
  let controller: AuthController;

  beforeEach(async () => {
    const hasedPassword = await hash('123456', 10);
    const mockAuthService: Partial<AuthService> = {
      loginUser: jest.fn( (user: LoginUserDto) => {
        if ( user.email === 'a@a.com') {
          return Promise.resolve({
            user: {
              id: 'mock-id',
              email: 'mock-email@example.com',
              role: 'user' as Roles,
            },
            token: 'mockToken',
          })
        }
        return Promise.reject(new Error('Invalid credentials'));
      }),
      createUser: jest.fn((user: CreateUserDto) => {
        return Promise.resolve({
            id: 'mock-id',
            name: 'mock-name',
            phone: 12345678,
            email: 'mock-email@example.com',
            password: hasedPassword,
            role: 'user' as Roles,
            city: 'mock-city',
            address: 'mock-address',
            country: 'mock-country',
            orders: [],
        });
      }),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: {
            loginUser: mockAuthService.loginUser,
            createUser: mockAuthService.createUser,
          },
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
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
    expect(controller).toBeDefined();
  });

  it('SignUp() should create User', async() => {
    const user = await controller.signupUser(mockCreateUser);
    expect(user).toBeDefined();
    expect(user).toHaveProperty('id');
  });

  it (' SignIn() should return a token', async() => {
    const result = await controller.loginUser(mockLoginUser);
    expect(result).toHaveProperty('token');
    expect(typeof result.token).toBe('string');
})
});
