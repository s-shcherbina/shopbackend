import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsModule } from '../goods/goods.module';
import { OrdersModule } from '../orders/orders.module';
import { OrderGoodEntity } from './entities/order-good.entity';
import { OrderGoodsController } from './order-goods.controller';
import { OrderGoodsService } from './order-goods.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([OrderGoodEntity]),
    GoodsModule,
    OrdersModule,
  ],
  controllers: [OrderGoodsController],
  providers: [OrderGoodsService],
})
export class OrderGoodsModule {}
