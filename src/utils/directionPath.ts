import * as path from 'path';
import * as fs from 'fs';
import { BadRequestException } from '@nestjs/common';

const uploadDir = path.join(path.resolve('./'), 'src', 'uploads-all');

export const directionPath = (keyName: string) => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir);
  }

  const eachCodeHouse = path.join(uploadDir, keyName);
  if (!fs.existsSync(eachCodeHouse)) {
    fs.mkdirSync(path.join(eachCodeHouse));
  }

  return eachCodeHouse;
};

export const readDirFilePath = (keyName: string) => {
  const eachCodeHouse = path.join(uploadDir, keyName);

  if (fs.existsSync(eachCodeHouse)) {
    return fs.readdirSync(eachCodeHouse);
  }

  throw new BadRequestException({
    message: 'readdir path not found',
  });
};

export const rmFilePath = (keyName: string, filename: string) => {
  const eachCodeHouse = path.join(uploadDir, keyName);
  if (fs.existsSync(eachCodeHouse)) {
    return fs.rmSync(path.join(eachCodeHouse, filename));
  }

  throw new BadRequestException({
    message: 'DirSync not found',
  });
};

export const rmDirectionPath = (keyName: string) => {
  const eachCodeHouse = path.join(uploadDir, keyName);
  if (fs.existsSync(eachCodeHouse)) {
    return fs.rmdirSync(eachCodeHouse, {
      recursive: true,
    });
  }

  throw new BadRequestException({
    message: 'DirSync not found',
  });
};
