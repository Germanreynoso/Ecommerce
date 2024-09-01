 import { Module } from '@nestjs/common';
 import { AppController } from './app.controller';
 import { AppService } from './app.service';
 import { UsersModule } from './users/users.module';
 import { AuthModule } from './auth/auth.module';
 import { ProductsModule } from './products/products.module';
 import { OrderDetailsModule } from './order-details/order-details.module';
 import { ConfigModule, ConfigService } from '@nestjs/config';
 import { TypeOrmModule } from '@nestjs/typeorm';
 import { CategoriesModule } from './categories/categories.module';
 import { OrdersModule } from './orders/orders.module';
 import { SeedsModule } from './seeds/seeds.module';
 import { OrderDetail } from './order-details/entities/order-detail.entity';
 import { Order } from './orders/entities/order.entity';
 import { Product } from './products/entities/product.entity';
 import { User } from './users/entities/user.entity';
 import { Category } from './categories/entities/category.entity';
 import { CloudinaryService } from './service/cloudinary/cloudinary.service';
 import { FileUploadModule } from './file-upload/file-upload.module';
 import { SharedModule } from './shared/shared/shared.module';
 import { sqliteDataSourceConfig } from 'test/users/typeorm-testing-config';
 import { CloudinaryModule } from './service/cloudinary/clodinary-module';

 @Module({
   imports: [
     ConfigModule.forRoot({
       envFilePath: ['.env'],
       isGlobal: true,
     }),
     TypeOrmModule.forRootAsync({
       imports: [ConfigModule],
       useFactory: (configService: ConfigService) => ({
         type: 'postgres',
         host: configService.get<string>('DB_HOST'),
         port: +configService.get<number>('DB_PORT'),
         username: configService.get<string>('DB_USERNAME'),
         password: configService.get<string>('DB_PASSWORD'),
         database: configService.get<string>('DB_NAME'),
         entities: [Order, OrderDetail, Product, User, Category],
         synchronize: true,
       }),
       inject: [ConfigService],
     }),
     UsersModule,
     AuthModule,
     ProductsModule,
     OrderDetailsModule,
     CategoriesModule,
     SeedsModule,
     OrdersModule,
     FileUploadModule,
     SharedModule,
   ],
   controllers: [AppController],
   providers: [AppService, CloudinaryService],
 })
 export class AppModule {}
