import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const category = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(category);
  }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOne(id: string): Promise<Category | null> {
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category | null> {
    await this.categoryRepository.update(id, updateCategoryDto);
    return this.categoryRepository.findOne({
      where: { id },
    });
  }

  async remove(id: string): Promise<void> {
    await this.categoryRepository.delete(id);
  }
}
