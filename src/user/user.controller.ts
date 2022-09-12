import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CoreOuput } from '../common/dtos/coreOutput.dto';
import { GetUserId } from './decorators/jwt.decorator';
import { GetUser } from './decorators/user.decorator';
import {
  CreateAccountInput,
  CreateAccountOutput,
  FindUserOutput,
  SignTokenInput,
  SignTokenOutput,
  UpdateUserInput,
} from './dtos/user.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from './guards/user.guard';
import { JwtIdGuard } from './guards/userId.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Get('find/:uid')
  findUser(@Param('uid') findUserUid: string): Promise<FindUserOutput> {
    return this.userService.findUser({ uid: findUserUid });
  }

  @Get('search/:email')
  searchUser(@Param('email') searchUserEmail: string): Promise<FindUserOutput> {
    return this.userService.searchUser({ email: searchUserEmail });
  }

  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: User): User {
    return user;
  }

  @Patch()
  @UseGuards(JwtGuard)
  updateUser(
    @GetUser() user: User,
    @Body() updateUserInput: UpdateUserInput,
  ): any {
    return this.userService.updateUser(user, updateUserInput);
  }

  @Delete()
  @UseGuards(JwtIdGuard)
  deleteUser(@GetUserId() userUid: string): Promise<CoreOuput> {
    return this.userService.deleteUser(userUid);
  }

  @Post('signin')
  signToken(@Body() signTokenInput: SignTokenInput): Promise<SignTokenOutput> {
    return this.userService.signToken(signTokenInput);
  }

  /* TODO
  getChatRooms

  createChatRoom
  addMembers(초대장 없이 내가 초대하면 자동참가)
  updateChatRoom
  exitChatRoom(마지막 인원이 나가면 자동으로 삭제(deleteChatRoom 서비스 제작(controller 없이))


  newChat
  deleteChat(진짜 삭제되는 것이 아닌 삭제처리: socket을 이용해 삭제하였다고 통보: 프런트에서 삭제)
   */
}
