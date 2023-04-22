import { extname } from 'path';
import { HttpException, HttpStatus } from '@nestjs/common';
import { v4 } from 'uuid';

export const imageFileFilter = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, acceptFile: boolean) => void,
) => {
  if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
    return callback(
      new HttpException('Тількі фото', HttpStatus.BAD_REQUEST),
      false,
    );
  }
  callback(null, true);
};

export const editFileName = (
  req: any,
  file: Express.Multer.File,
  callback: (error: Error, filename: string) => void,
) => {
  callback(null, v4() + `${extname(file.originalname)}`);
};
