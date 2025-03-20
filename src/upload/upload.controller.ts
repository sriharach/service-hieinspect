import { directionPath } from '@/utils/directionPath';
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
import { ConfigService } from '@nestjs/config';
import { FileInterceptor } from '@nestjs/platform-express';
import * as fs from 'fs';
import * as path from 'path';

// @UseGuards(JwtAuthGuard)
@Controller('upload')
export class UploadController {
  constructor(private configService: ConfigService) {}

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
    const config = this.configService.get('PREFIX_NAME_FILE');
    const eachCodeHouse = directionPath(code_house);
    const changeFilename = `${config}-${getRandomUniqueNumbersUsingFilter(1, 90, 5).join('')}.${file.mimetype.split('image/')[1]}`;
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
