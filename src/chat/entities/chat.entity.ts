import { IsDefined, IsEnum, IsInt, IsOptional } from 'class-validator';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { CoreEntity } from '../../common/entities/core.entity';
import { User } from '../../user/entities/user.entity';
import { ChatRoom } from '../../chatRoom/entities/chatRoom.entity';

export enum ChatType {
  Message = 'Message',
  System = 'System',
}

@Entity('Chat')
export class Chat extends CoreEntity {
  @Column({ nullable: true })
  deletedAt?: Date;

  @Column({ type: 'enum', enum: ChatType, default: ChatType.Message })
  @IsEnum(ChatType)
  type: ChatType;

  @Column()
  @IsDefined()
  body: string;

  @ManyToOne(() => User, { onDelete: 'RESTRICT' })
  sender: User;

  @RelationId((chat: Chat) => chat.sender)
  @IsInt()
  senderId: number;

  @ManyToOne(() => ChatRoom, { onDelete: 'CASCADE' })
  @IsDefined()
  room: ChatRoom;

  @RelationId((chat: Chat) => chat.room)
  @IsInt()
  roomId: number;
}
