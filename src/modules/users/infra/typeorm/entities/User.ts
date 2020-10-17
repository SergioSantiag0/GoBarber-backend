import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import uploadConfig from '@config/upload'
import { Exclude, Expose } from 'class-transformer'
import upload from '@config/upload';

@Entity('users')
class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  @Exclude()
  password: string;

  @Column()
  avatar: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Expose({ name: 'avatar_url' })
  getAvatar_url(): string | null {
    if (!this.avatar) {
      return null;
    }

    switch (upload.driver) {
      case 'disk':
        return this.avatar ? `${process.env.APP_API_URL}/files/${this.avatar}` : null;
      case 's3':
        return `https://${uploadConfig.config.aws.bucket}.s3.us-east-2.amazonaws.com/${this.avatar}`;
      default:
        return null
    }

  }
}

export default User;

