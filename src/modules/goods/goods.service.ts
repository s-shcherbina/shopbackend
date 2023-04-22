import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ImagesService } from '../images/images.service';
import { SubGroupEntity } from '../sub-groups/entities/sub-group.entity';
import { CreateGoodDTO } from './dto';
import { GoodEntity } from './entities/good.entity';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodEntity)
    private readonly goodRepository: Repository<GoodEntity>,
    @InjectRepository(SubGroupEntity)
    private readonly subGroupRepository: Repository<SubGroupEntity>,
    private readonly imagesService: ImagesService,
  ) {}

  async createGood(dto: CreateGoodDTO): Promise<void> {
    const existGood = await this.goodRepository.findOneBy({
      name: dto.name,
    });
    if (existGood) throw new BadRequestException('Такий товар вже існує');

    const subGroup = await this.subGroupRepository.findOneBy({
      id: dto.subGroupId,
    });
    if (!subGroup)
      throw new BadRequestException('Немає підгрупи для створення товару');

    delete dto.subGroupId;
    await this.goodRepository.save({ ...dto, subGroup });
  }

  async getGoods(subGroupId: number): Promise<GoodEntity[]> {
    if (!subGroupId) return this.goodRepository.find();
    return await this.goodRepository
      .createQueryBuilder('good')
      .where('good.subGroupId = :id', { id: subGroupId })
      .leftJoinAndSelect('good.subGroup', 'subGroup')
      .getMany();
  }

  async getGood(id: number): Promise<GoodEntity> {
    return await this.goodRepository.findOneBy({ id });
  }

  async updateGood(
    id: number,
    dto: Omit<CreateGoodDTO, 'subGroupId'>,
  ): Promise<string> {
    const existGood = await this.goodRepository.findOneBy({ name: dto.name });
    if (existGood && existGood.id == id)
      throw new BadRequestException('Не змінили назву');

    if (existGood && existGood.id != id)
      throw new BadRequestException('Такий товар вже існує');

    await this.goodRepository.update({ id }, { ...dto });
    return 'Оновлено';
  }

  async removeGood(id: number): Promise<string> {
    await this.removeImgsGood(id);
    await this.goodRepository.delete({ id });
    return 'Видалено';
  }

  async removeImgsGood(goodId: number) {
    const images = await this.imagesService.getImages(goodId);
    if (!images) throw new BadRequestException('Немає фото у цього товару');

    images.forEach((image) => this.imagesService.removeImgFile(image.name));
  }
}
