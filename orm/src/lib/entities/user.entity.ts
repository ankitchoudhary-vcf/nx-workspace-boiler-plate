import { Column, Entity } from 'typeorm';
import { ENTITY_NAME } from '../constants';
import { BaseEntity } from './base-entity';

@Entity(ENTITY_NAME.user)
export class UserEntity extends BaseEntity {
  @Column()
  email: string;

  @Column()
  password: string;
}
