import { Entity, Column, OneToOne } from 'typeorm';
import { ProductEntity } from '@src/products/entities/product.entity';
import { BaseEntity } from '@src/shared/database/base.entity';

@Entity('rating')
export class RatingEntity extends BaseEntity {
  @Column('decimal', { precision: 2, scale: 1 })
  rate: number;

  @Column()
  count: number;

  @OneToOne(() => ProductEntity, (product) => product.rating)
  product: ProductEntity;
}
