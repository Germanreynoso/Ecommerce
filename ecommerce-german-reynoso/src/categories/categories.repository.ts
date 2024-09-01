import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

export class CategoriesRepository extends Repository<Category> {
  async getCategories(): Promise<Category[]> {
    return this.find();
  }

  async addCategories(categories: Category[]): Promise<Category[]> {
    return this.save(categories);
  }

  async findCategoryByName(name: string): Promise<Category | undefined> {
    return this.findOne({ where: { name } });
  }
}
