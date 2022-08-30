import { IsArray, IsInt, IsOptional, IsString } from 'class-validator';
import { Column, Entity, ManyToMany, OneToMany } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../user/entities/user.entity';
import { Chat } from '../../chat/entities/chat.entity';

@Entity('ChatRoom')
export class ChatRoom extends CoreEntity {
  @Column()
  @IsString()
  name: string;

  @Column({ nullable: true })
  @IsOptional()
  @IsString()
  coverImg?: string;

  @ManyToMany(() => User, (user: User) => user.rooms)
  @IsArray()
  users: User[];

  @OneToMany(() => Chat, (chat: Chat) => chat.room)
  @IsArray()
  chat: Chat[];
}
