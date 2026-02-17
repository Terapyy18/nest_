
import { Column, Entity, Index, PrimaryGeneratedColumn } from 'typeorm';


@Entity('user_credentials')
export class UserCredentialsEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Index({ unique: true })
  @Column({ name: 'email', type: 'varchar', length: 255 })
  email: string;

  @Column({ name: 'password_hash', type: 'varchar', length: 255 })
  passwordHash: string;

  @Column({ name: 'created_at' })
  createdAt: Date;

  @Column({ name: 'permissions', type: 'bigint', default: 0 })
  permissions: string;
}