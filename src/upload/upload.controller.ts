import { getRandomUniqueNumbersUsingFilter } from '@/utils/rendomUnique';
import {
  Controller,
  Post,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  Body,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

// @UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor() {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new MaxFileSizeValidator({ maxSize: 5 * 1024 * 1024 })],
      }),
    )
    file: Express.Multer.File,
    @Body('code_house') code_house: string, // Get 'code_house' as a string from form-data
  ) {
    const uploadDir = path.join(path.resolve('./'), 'src', 'uploads-all');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir);
    }

    const eachCodeHouse = path.join(uploadDir, code_house);
    if (!fs.existsSync(eachCodeHouse)) {
      fs.mkdirSync(path.join(eachCodeHouse));
    }

    const changeFilename = `image-${getRandomUniqueNumbersUsingFilter(1, 90, 5).join('')}.${file.mimetype.split('image/')[1]}`;
    const filePath = path.join(eachCodeHouse, changeFilename);

    return new Promise((resolve, reject) => {
      // Create write stream
      const writeStream = fs.createWriteStream(filePath);

      writeStream.write(file.buffer);
      writeStream.end();

      writeStream.on('finish', () =>
        resolve({
          file_name: changeFilename,
          path_name: `/${code_house}/${changeFilename}`,
        }),
      );
      writeStream.on('error', (err) => reject(err));
    });
  }
}
