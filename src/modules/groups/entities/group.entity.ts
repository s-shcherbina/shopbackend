import { SubGroupEntity } from 'src/modules/sub-groups/entities/sub-group.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'groups' })
export class GroupEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, unique: true })
  name: string;

  @OneToMany(() => SubGroupEntity, (subGroups) => subGroups.group)
  subGroups: SubGroupEntity[];
}
