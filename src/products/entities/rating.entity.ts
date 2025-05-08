import { Entity, Column, OneToOne } from 'typeorm';
import { Product } from '@src/products/entities/product.entity';
import { BaseEntity } from '@src/shared/database/base.entity';

@Entity()
export class Rating extends BaseEntity {
  @Column('decimal', { precision: 2, scale: 1 })
  rate: number;

  @Column()
  count: number;

  @OneToOne(() => Product, (product) => product.rating)
  product: Product;
}
