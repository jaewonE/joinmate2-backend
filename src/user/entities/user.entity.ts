import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';
import { IsArray, IsEmail, IsOptional, IsString } from 'class-validator';
import { CoreEntity } from '../../common/entities/core.entity';
import { ChatRoom } from '../../chatRoom/entities/chatRoom.entity';

@Entity('User')
export class User extends CoreEntity {
  @CreateDateColumn()
  updateAt: Date;

  @Column()
  @IsString()
  name: string;

  @Column({ unique: true })
  @IsEmail()
  email: string;

  @Column()
  @IsString()
  password: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  coverImg?: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  bgCoverImg?: string;

  @ManyToMany(() => User)
  @JoinTable({ joinColumn: { name: 'User_id_1' } })
  @IsArray()
  friends: User[];

  @ManyToMany(() => ChatRoom, (chatRoom: ChatRoom) => chatRoom.users)
  @JoinTable()
  @IsArray()
  rooms: ChatRoom[];
}
