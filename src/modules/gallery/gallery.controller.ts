import {
  Controller,
  Delete,
  Get,
  Param,
  Post,
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
import { GalleryEntity } from './entities/gallery.entity';
import { GalleryService } from './gallery.service';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}

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
  uploadImages(@UploadedFiles() files: Express.Multer.File[]) {
    return this.galleryService.uploadImages(files);
  }

  @Get()
  getImages(): Promise<GalleryEntity[]> {
    return this.galleryService.getImages();
  }

  @Get(':id')
  getImage(@Param('id') id: number): Promise<GalleryEntity> {
    return this.galleryService.getImage(id);
  }

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.Admin)
  @Delete(':id')
  removeImage(@Param('id') id: number): Promise<string> {
    return this.galleryService.removeImage(id);
  }
}
