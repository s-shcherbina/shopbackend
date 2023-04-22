import { ImageEntity } from 'src/modules/images/entities/image.entity';
import { OrderGoodEntity } from 'src/modules/order-goods/entities/order-good.entity';
import { SubGroupEntity } from 'src/modules/sub-groups/entities/sub-group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'goods' })
export class GoodEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @Column({ nullable: false })
  price: number;

  @Column({ nullable: false, type: 'text' })
  text: string;

  @OneToMany(() => OrderGoodEntity, (orderGoods) => orderGoods.good)
  orderGoods: OrderGoodEntity[];

  @OneToMany(() => ImageEntity, (images) => images.good)
  images: ImageEntity[];

  @ManyToOne(() => SubGroupEntity, (subGroup) => subGroup.goods, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  subGroup: SubGroupEntity;
}
