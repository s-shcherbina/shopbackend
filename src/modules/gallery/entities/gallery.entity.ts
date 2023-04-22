import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'gallery' })
export class GalleryEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  name: string;
}
