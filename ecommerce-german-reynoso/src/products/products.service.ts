import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { FileUploadService } from 'src/file-upload/file-upload.service';
import { UploadFileDto } from 'src/file-upload/dto/upload-file.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
    private readonly fileUploadService: FileUploadService,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(page: number, limit: number): Promise<Product[]> {
    return await this.productRepository.find({
      take: limit,
      skip: (page - 1) * limit,
    });
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const result = await this.productRepository.update(id, updateProductDto);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return this.productRepository.findOne({ where: { id } });
  }

  async buyProduct(id: string): Promise<number> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new Error('Product not found');
    }
    if (product.stock === 0) {
      throw new Error('Out of stock');
    }
    await this.productRepository.update(id, {
      stock: product.stock - 1,
    });
    return product.price;
  }

  async remove(id: string): Promise<void> {
    const result = await this.productRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
  }

  async uploadFile(file: UploadFileDto, id: string) {
    const result = await this.fileUploadService.uploadFile(file);
    await this.productRepository.update(id, { imgUrl: result.url }); // Usa `result.url`
    return { imgUrl: result.url };
  }
}
