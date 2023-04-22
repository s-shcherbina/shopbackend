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
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { OrderGoodParams } from 'src/types';
import { createOrderGoodDTO } from './dto';
import { OrderGoodEntity } from './entities/order-good.entity';
import { OrderGoodsService } from './order-goods.service';

@Controller('order_goods')
export class OrderGoodsController {
  constructor(private readonly orderGoodsService: OrderGoodsService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  createOrder(@Body() dto: createOrderGoodDTO) {
    return this.orderGoodsService.createOrderGood(dto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  getOrders(@Query() params: OrderGoodParams): Promise<OrderGoodEntity[]> {
    return this.orderGoodsService.getOrderGoods(params.goodId, params.orderId);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  getOrder(@Param('id') id: number): Promise<OrderGoodEntity> {
    return this.orderGoodsService.getOrderGood(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateOrderGood(
    @Body('items') items: number,
    @Param('id') id: number,
  ): Promise<string> {
    return this.orderGoodsService.updateOrderGood(id, items);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  removeOrder(@Param('id') id: number): Promise<string> {
    return this.orderGoodsService.removeOrderGood(id);
  }
}
