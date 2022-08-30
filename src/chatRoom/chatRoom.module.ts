import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ChatRoom } from './entities/chatRoom.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ChatRoom])],
  providers: [],
  exports: [],
})
export class ChatRoomModule {}
