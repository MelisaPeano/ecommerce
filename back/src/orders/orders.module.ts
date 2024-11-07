import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Order } from 'src/entitys/order.entity';
import { OrderDetail } from 'src/entitys/orderDetails.entity';
import { UsersModule } from 'src/users/users.module';
import { ProductsModule } from 'src/products/products.module';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { JwtService } from '@nestjs/jwt';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Order, OrderDetail]),
    UsersModule,
    ProductsModule,
    CloudinaryModule,
    AuthModule,
  ],
  controllers: [OrdersController],
  providers: [OrdersService, UsersService, ProductsService, JwtService],
  exports: [OrdersService, TypeOrmModule],
})
export class OrdersModule {}
