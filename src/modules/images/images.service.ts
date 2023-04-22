import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImageEntity } from './entities/image.entity';
import * as fs from 'fs';
import { GoodEntity } from '../goods/entities/good.entity';
import { join } from 'path';

@Injectable()
export class ImagesService {
  constructor(
    @InjectRepository(ImageEntity)
    private readonly imageRepository: Repository<ImageEntity>,
    @InjectRepository(GoodEntity)
    private readonly goodRepository: Repository<GoodEntity>,
  ) {}

  removeImgFile(name: string) {
    const filePath = join(__dirname, '../../..', 'uploads', name);
    if (fs.existsSync(filePath))
      fs.unlink(filePath, (err) => {
        if (err) throw err;
      });
  }

  async createImage(file: Express.Multer.File, good: GoodEntity) {
    await this.imageRepository.save({ name: file.filename, good });
  }

  async uploadImages(goodId: number, files: Express.Multer.File[]) {
    const good = await this.goodRepository.findOneBy({ id: goodId });
    if (!good) {
      files.forEach((file) => this.removeImgFile(file.filename));
      throw new BadRequestException('Немає товару для створення зображень');
    }
    for (const file of files) {
      await this.createImage(file, good);
    }
  }

  async getImages(goodId: number): Promise<ImageEntity[]> {
    if (!goodId) return this.imageRepository.find();
    return await this.imageRepository
      .createQueryBuilder('image')
      .where('image.goodId = :id', { id: goodId })
      .leftJoinAndSelect('image.good', 'good')
      .getMany();
  }

  async getImage(id: number): Promise<ImageEntity> {
    return await this.imageRepository.findOneBy({ id });
  }

  async removeImage(id: number): Promise<string> {
    const image = await this.imageRepository.findOneBy({ id });
    if (!image) throw new BadRequestException('Немає фото');
    this.removeImgFile(image.name);

    await this.imageRepository.delete({ id });
    return 'Видалено';
  }
}
