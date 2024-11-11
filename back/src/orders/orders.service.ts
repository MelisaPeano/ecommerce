import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { ProductsService } from 'src/products/products.service';
import { Products } from 'src/entitys/products.entity';
import { Repository } from 'typeorm';
import { Order } from 'src/entitys/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { OrderDetail } from 'src/entitys/orderDetails.entity';
import { v4 as uuid } from 'uuid';
import { OrderDetailResponse } from 'src/orderDetail/dto/orderDetailResponse';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order)
    private readonly orderRepository: Repository<Order>,
    private readonly usersService: UsersService,
    private readonly productsService: ProductsService,
    @InjectRepository(OrderDetail)
    private readonly orderDetailsRepository: Repository<OrderDetail>,
  ) {}
  async addOrder(
    userId: string,
    productsId: { productId: string }[],
  ): Promise<OrderDetailResponse> {
    if (!productsId) {
      throw new Error('No se han agregado productos');
    }
    if (!userId) {
      throw new Error('No se ha agregado un usuario');
    }
    const user = await this.usersService.getUsersById(userId);
    const totalPrice: number[] = [];
    const products: Products[] = await Promise.all(
      productsId.map(async (product) => {
        const foundProducts = await this.productsService.getProductById(
          product.productId,
        );
        if (!foundProducts || foundProducts.stock <= 0) {
          throw new Error(`${foundProducts.id} no existe, o no tiene stock`);
        } else {
          totalPrice.push(foundProducts.price);
          foundProducts.stock -= 1;
          await this.productsService.updateProduct(
            foundProducts.id,
            foundProducts,
          );
          return foundProducts;
        }
      }),
    );
    const orderDetail = this.orderDetailsRepository.create({
      id: uuid(),
      price: totalPrice.reduce((a, b) => a + b, 0),
      products: products,
    });
    await this.orderDetailsRepository.save(orderDetail);
    const order = this.orderRepository.create({
      id: uuid(),
      user_id: uuid(),
      date: new Date(),
      orderDetail,
    });
    await this.orderRepository.save(order);
    const ordenSave = {
      order: order,
      price: orderDetail.price,
      orderDetail: order.orderDetail.id,
    };
    return ordenSave;
  }
  async getOrders(id: string): Promise<Order> {
    const orders = await this.orderRepository.findOneBy({
      id: id,
    });
    const orderDetail = await this.orderDetailsRepository.find({
      where: { id: orders.id },
      relations: ['orderDetail', 'products'],
    });
    return {
      id: orders.id,
      user_id: orders.user_id,
      date: orders.date,
      user: orders.user,
      orderDetail: {
        id: orderDetail[0].id,
        price: orders.orderDetail.price,
        order: orders.orderDetail.order,
        products: orders.orderDetail.products,
      },
    };
  }
}
