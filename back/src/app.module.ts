import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { ProductsModule } from './products/products.module';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import typeOrmConfig from './config/typeorm';
import { DataSourceOptions } from 'typeorm';
import { CategoriesModule } from './categories/categories.module';
import { SeederModule } from './seeder/seeder.module';
import { ProductsService } from './products/products.service';
import { CategoriesService } from './categories/categories.service';
import { OrdersModule } from './orders/orders.module';
import { OrdersService } from './orders/orders.service';
import { CloudinaryService } from './cloudinary/cloudinary.service';
import { CloudinaryConfig } from './config/cloudinary';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeOrmConfig],
    }),
    TypeOrmModule.forRootAsync({
      // estoy cargando la configuración de forma asíncrona
      inject: [ConfigService],
      useFactory: (ConfigService: ConfigService) => ({
        ...ConfigService.get('environment') === 'test'
           ? ConfigService.get('sqlite')
           : ConfigService.get('typeorm'),
        autoLoadEntities: true,
      }),
    }),
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'fallback_secret_key', 
      signOptions: { expiresIn: '1h' },
    }),
    AuthModule,
    ProductsModule,
    UsersModule,
    CategoriesModule,
    SeederModule,
    OrdersModule,
    CloudinaryModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    ProductsService,
    CategoriesService,
    OrdersService,
    CloudinaryConfig,
    CloudinaryService,
    JwtService,
  ],
})
export class AppModule {}
