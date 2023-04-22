import { GoodEntity } from 'src/modules/goods/entities/good.entity';
import { OrderEntity } from 'src/modules/orders/entities/order.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'order_goods' })
export class OrderGoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  items: number;

  @ManyToOne(() => GoodEntity, (good) => good.orderGoods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  good: GoodEntity;

  @ManyToOne(() => OrderEntity, (order) => order.orderGoods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  order: OrderEntity;
}
