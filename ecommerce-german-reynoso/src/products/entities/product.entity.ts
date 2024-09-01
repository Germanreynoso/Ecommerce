import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Category } from 'src/categories/entities/category.entity';

@Entity()
export class Product {
    @PrimaryGeneratedColumn('uuid')
    id: string;   

    @Column()
    name: string;

    @Column()
    description: string;

    @Column('decimal', { precision: 10, scale: 2 })
    price: number;

    @Column({ nullable: true })
    imgUrl: string;

    @Column()
    stock: number;

    @ManyToOne(() => Category, (category) => category.products)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
    
}
