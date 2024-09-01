import { Controller, Post, Body, Param, UploadedFile, UseInterceptors, Get, UsePipes,Patch,Delete  } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UploadFileDto } from './dto/upload-file.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageValidationPipe } from 'src/pipes/image/image-validation.pipe';
import { ValidationPipe } from 'src/pipes/validation.pipes';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('uploadImage/:id')
  @UseInterceptors(FileInterceptor('file')) // Interceptor para manejar el archivo subido
  @UsePipes(new ImageValidationPipe()) // Aplicar el pipe de validación de imagen
  async uploadImage(
    @Param('id') id: string,
    @UploadedFile() file: Express.Multer.File
  ) {
    return this.fileUploadService.uploadImage(id, file);
  }

  @Post()
  @UsePipes(new ValidationPipe()) // Aplicar el pipe de validación de DTO
  async create(@Body() createFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.create(createFileUploadDto);
  }

  @Get()
  async findAll() {
    return this.fileUploadService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return this.fileUploadService.findOne(id);
  }

  @Patch(':id')
  @UsePipes(new ValidationPipe()) // Aplicar el pipe de validación de DTO
  async update(@Param('id') id: string, @Body() updateFileUploadDto: CreateFileUploadDto) {
    return this.fileUploadService.update(id, updateFileUploadDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.fileUploadService.remove(id);
  }
}
