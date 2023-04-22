import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodsService } from '../goods/goods.service';
import { OrdersService } from '../orders/orders.service';
import { createOrderGoodDTO } from './dto';
import { OrderGoodEntity } from './entities/order-good.entity';

@Injectable()
export class OrderGoodsService {
  constructor(
    @InjectRepository(OrderGoodEntity)
    private readonly orderGoodRepository: Repository<OrderGoodEntity>,
    private readonly goodsService: GoodsService,
    private readonly ordersService: OrdersService,
  ) {}

  async createOrderGood(dto: createOrderGoodDTO) {
    const good = await this.goodsService.getGood(dto.goodId);
    if (!good) throw new BadRequestException('Немає такого товару');
    const order = await this.ordersService.getOrder(dto.orderId);
    if (!order) throw new BadRequestException('Немає такого замовлення');
    await this.orderGoodRepository.save({ items: dto.items, good, order });
  }

  async getOrderGoods(
    goodId: number,
    orderId: number,
  ): Promise<OrderGoodEntity[]> {
    return await this.orderGoodRepository
      .createQueryBuilder('orderGood')
      .where('orderGood.goodId = :goodId', { goodId })
      .andWhere('orderGood.orderId = :orderId', { orderId })
      .leftJoinAndSelect('orderGood.good', 'good')
      .leftJoinAndSelect('orderGood.order', 'order')
      .getMany();
  }

  async getOrderGood(id: number): Promise<OrderGoodEntity> {
    return await this.orderGoodRepository.findOneBy({ id });
  }

  async updateOrderGood(id: number, items: number): Promise<string> {
    await this.orderGoodRepository.update({ id }, { items });
    return 'Оновлено';
  }

  async removeOrderGood(id: number): Promise<string> {
    await this.orderGoodRepository.delete({ id });
    return 'Видалено';
  }
}
