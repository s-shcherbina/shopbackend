import { GoodEntity } from 'src/modules/goods/entities/good.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'images' })
export class ImageEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;

  @ManyToOne(() => GoodEntity, (good) => good.images, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  good: GoodEntity;
}
