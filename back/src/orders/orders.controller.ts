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
import { ApiBearerAuth, ApiParam, ApiResponse } from '@nestjs/swagger';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @ApiBearerAuth()
  @ApiParam({ name: 'id', description: 'ID del usuario formato UUID' })
  @ApiResponse({ status: 200, description: 'retrna la orden de compra y el detalle de la misma' })
  @Get('/:id')
  @UseGuards(AuthGuard)
  async getOrders(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.ordersService.getOrders(id);
  }
  @ApiBearerAuth()
  @ApiResponse({ status: 200, description: 'retrna la orden de compra creada con los productos agregados' })
  @ApiParam({ name: 'userId', description: 'ID del usuario formato UUID' })
  @ApiParam({ name: 'products', description: 'Array de productos' })
  @Post()
  @UseGuards(AuthGuard)
  async reciveOrder(userId: string, products: [{ productId: string }]) {
    const order = await this.ordersService.addOrder(userId, products);
    return order;
  }
}
