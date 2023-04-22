import { GoodEntity } from 'src/modules/goods/entities/good.entity';
import { GroupEntity } from 'src/modules/groups/entities/group.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'sub_groups' })
export class SubGroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => GoodEntity, (good) => good.subGroup)
  goods: GoodEntity[];

  @ManyToOne(() => GroupEntity, (group) => group.subGroups, {
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  group: GroupEntity;
}
