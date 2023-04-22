import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
  UploadedFiles,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FilesInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { Roles } from 'src/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { RolesGuard } from 'src/guards/roles.guard';
import { Role } from 'src/types';
import { editFileName, imageFileFilter } from 'src/utils/file-upload.utils';
import { ImageEntity } from './entities/image.entity';
import { ImagesService } from './images.service';

@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Post()
  @UseInterceptors(
    FilesInterceptor('images', 12, {
      storage: diskStorage({
        destination: './uploads',
        filename: editFileName,
      }),
      fileFilter: imageFileFilter,
    }),
  )
  uploadImages(
    @Body('goodId') goodId: number,
    @UploadedFiles()
    files: Express.Multer.File[],
  ) {
    return this.imagesService.uploadImages(goodId, files);
  }

  @Get()
  getImages(@Query('goodId') goodId: number): Promise<ImageEntity[]> {
    return this.imagesService.getImages(goodId);
  }

  @Get(':id')
  getImage(@Param('id') id: number): Promise<ImageEntity> {
    return this.imagesService.getImage(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeImage(@Param('id') id: number): Promise<string> {
    return this.imagesService.removeImage(id);
  }
}
