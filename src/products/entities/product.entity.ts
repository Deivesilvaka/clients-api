import { Entity, Column, OneToOne, JoinColumn, ManyToMany } from 'typeorm';
import { RatingEntity } from '@src/products/entities/rating.entity';
import { BaseEntity } from '@src/shared/database/base.entity';
import { UsersEntity } from '@src/users/entities/user.entity';

@Entity('product')
export class ProductEntity extends BaseEntity {
  @Column({ name: 'title' })
  title: string;

  @Column({ name: 'price', type: 'decimal', precision: 10, scale: 2 })
  price: number;

  @Column({ name: 'externalProductId', type: 'integer' })
  externalProductId: number;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'category' })
  category: string;

  @Column({ name: 'image' })
  image: string;

  @OneToOne(() => RatingEntity, {
    cascade: true,
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn()
  rating?: RatingEntity;

  @ManyToMany(() => UsersEntity, (user) => user.favoriteProducts)
  favoritedBy?: UsersEntity[];
}
