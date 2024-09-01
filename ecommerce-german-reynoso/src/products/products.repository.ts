import { Injectable, NotFoundException } from '@nestjs/common';

@Injectable()
export class ProductRepository {
  private products = [
    {
      id: 1,
      name: 'Laptop',
      description: 'High performance laptop',
      price: 999.99,
      stock: true,
      imgUrl: 'https://example.com/laptop.jpg',
    },
    {
      id: 2,
      name: 'Smartphone',
      description: 'Latest model smartphone',
      price: 499.99,
      stock: true,
      imgUrl: 'https://example.com/smartphone.jpg',
    },
    {
      id: 3,
      name: 'Tablet',
      description: 'Lightweight tablet with great battery life',
      price: 299.99,
      stock: true,
      imgUrl: 'https://example.com/tablet.jpg',
    },
    {
      id: 4,
      name: 'Headphones',
      description: 'Noise-cancelling over-ear headphones',
      price: 89.99,
      stock: true,
      imgUrl: 'https://example.com/headphones.jpg',
    },
    {
      id: 5,
      name: 'Smartwatch',
      description: 'Smartwatch with fitness tracking',
      price: 199.99,
      stock: true,
      imgUrl: 'https://example.com/smartwatch.jpg',
    },
  ];

  findAll() {
    return this.products;
  }

  findOne(id: number) {
    const product = this.products.find(product => product.id === id);
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  create(product: any) {
    this.products.push({ ...product, id: Date.now() }); // Generate a new ID
    return product;
  }

  update(id: number, updateProduct: any) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products[index] = { ...this.products[index], ...updateProduct };
    return this.products[index];
  }

  remove(id: number) {
    const index = this.products.findIndex(product => product.id === id);
    if (index === -1) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    this.products.splice(index, 1);
  }
}
