import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Get('/:id')
  @UseGuards(AuthGuard)
  async getOrders(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.getOrders(id);
  }
  @Post()
  @UseGuards(AuthGuard)
  async reciveOrder(userId: string, products: [{ productId: string }]) {
    const order = await this.ordersService.addOrder(userId, products);
    return order;
  }
}
