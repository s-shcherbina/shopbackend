import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GoodEntity } from '../goods/entities/good.entity';
import { GoodsService } from '../goods/goods.service';
import { GroupEntity } from '../groups/entities/group.entity';
import { CreateSubGroupDTO } from './dto';
import { SubGroupEntity } from './entities/sub-group.entity';

@Injectable()
export class SubGroupsService {
  constructor(
    @InjectRepository(SubGroupEntity)
    private readonly subGroupRepository: Repository<SubGroupEntity>,
    @InjectRepository(GroupEntity)
    private readonly groupRepository: Repository<GroupEntity>,
    private readonly goodsService: GoodsService,
  ) {}

  async createSubGroup(dto: CreateSubGroupDTO) {
    const existSubGroup = await this.subGroupRepository.findOneBy({
      name: dto.name,
    });
    if (existSubGroup) throw new BadRequestException('Така підгрупа вже існує');

    const group = await this.groupRepository.findOneBy({ id: dto.groupId });
    if (!group)
      throw new BadRequestException('Немає групи для створення підгрупи');

    await this.subGroupRepository.save({
      name: dto.name,
      group,
    });
  }

  async getSubGroups(groupId: number): Promise<SubGroupEntity[]> {
    if (!groupId) return this.subGroupRepository.find();
    return await this.subGroupRepository
      .createQueryBuilder('subGroup')
      .where('subGroup.groupId = :id', { id: groupId })
      .leftJoinAndSelect('subGroup.group', 'group')
      .getMany();
  }

  async getSubGroup(id: number): Promise<SubGroupEntity> {
    return await this.subGroupRepository.findOneBy({ id });
  }

  async updateSubGroup(id: number, name: string): Promise<string> {
    const existSubGroup = await this.subGroupRepository.findOneBy({ name });
    if (existSubGroup && existSubGroup.id == id)
      throw new BadRequestException('Не змінили назву');

    if (existSubGroup && existSubGroup.id != id)
      throw new BadRequestException('Така підгрупа вже існує');

    await this.subGroupRepository.update({ id }, { name });
    return 'Оновлено';
  }

  async removeSubGroup(id: number): Promise<string> {
    await this.removeImgsSubGroup(id);
    await this.subGroupRepository.delete({ id });
    return 'Видалено';
  }

  async removeImgsSubGroup(subGroupId: number) {
    const goods = await this.goodsService.getGoods(subGroupId);
    if (!goods) throw new BadRequestException('Немає товарів у підгрупі');

    await this.removeImgFilesOfSubGroup(goods);
  }

  async removeImgFilesOfSubGroup(goods: GoodEntity[]) {
    for (const good of goods) {
      await this.goodsService.removeImgsGood(good.id);
    }
  }
}
