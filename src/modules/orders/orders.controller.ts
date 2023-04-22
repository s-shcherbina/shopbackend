import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import { Roles } from 'src/decorators/roles.decorators';
import { UserId } from 'src/decorators/user.id.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { OrderParams, Role } from 'src/types';
import { OrderEntity } from './entities/order.entity';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@UserId() id: number) {
    return this.ordersService.createOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Get('admin')
  getOrdersByAdmin(@Query() params: OrderParams): Promise<OrderEntity[]> {
    return this.ordersService.getOrders(params.userId, params.completed);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(
    @Query('completed') completed: boolean,
    @UserId() id: number,
  ): Promise<OrderEntity[]> {
    return this.ordersService.getOrders(id, completed);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrder(@Param('id') id: number): Promise<OrderEntity> {
    return this.ordersService.getOrder(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Patch(':id')
  updateOrder(
    @Body('completed') completed: boolean,
    @Param('id') id: number,
  ): Promise<string> {
    return this.ordersService.updateOrder(id, completed);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeOrder(@Param('id') id: number): Promise<string> {
    return this.ordersService.removeOrder(id);
  }
}
