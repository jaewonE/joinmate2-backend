import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { FriendController } from './friend.controller';
import { FriendService } from './friend.service';
import { JwtService } from './jwt/jwt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UserService, JwtService, FriendService],
  controllers: [UserController, FriendController],
  exports: [JwtService, UserService],
})
export class UserModule {}
