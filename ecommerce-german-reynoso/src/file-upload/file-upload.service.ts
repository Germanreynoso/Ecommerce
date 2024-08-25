import { Injectable, NotFoundException } from '@nestjs/common';
import { CloudinaryService } from 'src/service/cloudinary/cloudinary.service';
import { CreateFileUploadDto } from './dto/create-file-upload.dto';
import { UploadFileDto } from './dto/upload-file.dto';

@Injectable()
export class FileUploadService {
  private files = new Map<string, CreateFileUploadDto>(); // Para el ejemplo, usamos un mapa en memoria

  constructor(private readonly cloudinaryService: CloudinaryService) {}

  async uploadFile(file: UploadFileDto) {
    // Llama al servicio de Cloudinary para subir el archivo
    const result = await this.cloudinaryService.uploadFile(file.buffer, file.originalname);
    return result;
  }

  async create(createFileUploadDto: CreateFileUploadDto) {
    const id = Date.now().toString(); // Genera un ID simple para el ejemplo
    this.files.set(id, createFileUploadDto);
    return { id, ...createFileUploadDto };
  }

  async findAll() {
    return Array.from(this.files.values());
  }

  async findOne(id: string) {
    const file = this.files.get(id);
    if (!file) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    return file;
  }

  async update(id: string, updateFileUploadDto: CreateFileUploadDto) {
    const existingFile = this.files.get(id);
    if (!existingFile) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
    const updatedFile = { ...existingFile, ...updateFileUploadDto };
    this.files.set(id, updatedFile);
    return updatedFile;
  }

  async remove(id: string) {
    const result = this.files.delete(id);
    if (!result) {
      throw new NotFoundException(`File with id ${id} not found`);
    }
  }
}
