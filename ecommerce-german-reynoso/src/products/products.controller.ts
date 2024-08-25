import { Controller, Get, Post, Body, Patch, Param, Delete, Query, ParseUUIDPipe, Put, HttpCode, HttpException, HttpStatus, UseInterceptors, UploadedFile } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { Multer } from 'multer';
import { ImageUploadPipe } from 'src/pipes/image/image-upload/image-upload.pipe';
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  @HttpCode(201)
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  @HttpCode(200)
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.productsService.findAll(page, limit);
  }

  @Get(':id')
  @HttpCode(200)
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    return product;
  }

  @Put(':id')
  @HttpCode(200)
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    const updatedProduct = await this.productsService.update(id, updateProductDto);
    return updatedProduct;
  }

  @Delete(':id')
  @HttpCode(200)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productsService.findOne(id);
    if (!product) {
      throw new HttpException('Product not found', HttpStatus.NOT_FOUND);
    }
    await this.productsService.remove(id);
    return { message: `Product with id ${id} has been removed.` };
  }

  @Post(':id/upload')
  @HttpCode(200)
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(
    @Param('id') id: string,
    @UploadedFile(new ImageUploadPipe()) file: Express.Multer.File,
  ) {
    return this.productsService.uploadFile(file, id);
  }
}
