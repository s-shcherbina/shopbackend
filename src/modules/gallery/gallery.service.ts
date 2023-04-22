import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as fs from 'fs';
import { join } from 'path';
import { Repository } from 'typeorm';
import { GalleryEntity } from './entities/gallery.entity';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(GalleryEntity)
    private readonly galleryRepository: Repository<GalleryEntity>,
  ) {}
  removeImgFile(name: string) {
    const filePath = join(__dirname, '../../..', 'uploads', name);
    if (fs.existsSync(filePath))
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
  }
  async createImage(file: Express.Multer.File) {
    await this.galleryRepository.save({ name: file.filename });
  }

  async uploadImages(files: Express.Multer.File[]) {
    for (const file of files) {
      await this.createImage(file);
    }
  }

  async getImages(): Promise<GalleryEntity[]> {
    return await this.galleryRepository.find();
  }

  async getImage(id: number): Promise<GalleryEntity> {
    return await this.galleryRepository.findOneBy({ id });
  }

  async removeImage(id: number): Promise<string> {
    const image = await this.galleryRepository.findOneBy({ id });
    if (!image) throw new BadRequestException('Немає фото');
    this.removeImgFile(image.name);

    await this.galleryRepository.delete({ id });
    return 'Видалено';
  }
}
