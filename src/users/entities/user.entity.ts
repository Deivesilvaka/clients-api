import { BaseEntity } from '@src/shared/database/base.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { ProductEntity } from '@src/products/entities/product.entity';

@Entity('users')
export class UsersEntity extends BaseEntity {
  @Column({ name: 'name', type: 'varchar', length: 44, nullable: false })
  name: string;

  @Column({ name: 'email', type: 'varchar', nullable: false, unique: true })
  email: string;

  @Column({ name: 'password', type: 'varchar', nullable: false, select: false })
  password: string;

  @Column({ name: 'phone_number', type: 'varchar', nullable: false })
  phoneNumber: string;

  @ManyToMany(() => ProductEntity, (product) => product.favoritedBy, {
    eager: true,
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinTable({
    name: 'user_favorite_products',
    joinColumn: { name: 'user_id' },
    inverseJoinColumn: { name: 'product_id' },
  })
  favoriteProducts?: ProductEntity[];
}
