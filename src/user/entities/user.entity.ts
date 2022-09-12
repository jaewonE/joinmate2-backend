import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryColumn,
} from 'typeorm';
import {
  IsArray,
  IsBoolean,
  IsEmail,
  IsEnum,
  IsOptional,
  IsString,
} from 'class-validator';
import { ChatRoom } from '../../chatRoom/entities/chatRoom.entity';

export enum SignInType {
  EMAIL = 'email',
  GOOGLE = 'google',
}
@Entity('User')
export class User {
  @PrimaryColumn()
  @IsString()
  uid: string;

  @Column({
    type: 'enum',
    enum: SignInType,
    default: SignInType.EMAIL,
  })
  @IsOptional()
  @IsEnum(SignInType)
  signInType?: SignInType;

  @CreateDateColumn()
  createAt: Date;

  @Column()
  @IsString()
  name: string;

  @Column()
  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column({ default: false })
  @IsOptional()
  @IsBoolean()
  emailVerified?: boolean;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  coverImg?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  bgCoverImg?: string;

  @ManyToMany(() => User, (user) => user.following)
  @JoinTable()
  followers: User[];

  @ManyToMany(() => User, (user) => user.followers)
  following: User[];

  @ManyToMany(() => ChatRoom, (chatRoom: ChatRoom) => chatRoom.users)
  @JoinTable()
  @IsArray()
  rooms: ChatRoom[];
}
