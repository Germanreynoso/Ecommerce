import {
    BadRequestException,
    Injectable,
    PipeTransform,
  } from '@nestjs/common';
  import { diskStorage } from 'multer';
  import { extname } from 'path';
  
  @Injectable()
  export class ImageValidationPipe implements PipeTransform {
    readonly allowedExtensions = ['.jpg', '.jpeg', '.png'];
    readonly maxSize = 200 * 1024; // 200 KB
  
    transform(file: Express.Multer.File) {
      if (!this.isValidExtension(file.originalname)) {
        throw new BadRequestException('Invalid file type');
      }
  
      if (file.size > this.maxSize) {
        throw new BadRequestException('File size exceeds limit');
      }
  
      return file;
    }
  
    private isValidExtension(filename: string): boolean {
      const ext = extname(filename).toLowerCase();
      return this.allowedExtensions.includes(ext);
    }
  }
  