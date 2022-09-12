import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CoreOuput } from '../common/dtos/coreOutput.dto';
import { GetUserId } from './decorators/jwt.decorator';
import { DeleteFriendsInput, GetFriendsOutput } from './dtos/friend.dto';
import { FriendService } from './friend.service';
import { JwtIdGuard } from './guards/userId.guard';

@Controller('friend')
export class FriendController {
  constructor(private readonly friendService: FriendService) {}

  @Post('delete')
  @UseGuards(JwtIdGuard)
  deleteFriends(
    @GetUserId() userUid: string,
    @Body() deleteFriendsInput: DeleteFriendsInput,
  ): Promise<GetFriendsOutput> {
    return this.friendService.deleteFriends(userUid, deleteFriendsInput);
  }

  @Get(':email')
  @UseGuards(JwtIdGuard)
  addFriend(
    @Param('email') email: string,
    @GetUserId() userUid: string,
  ): Promise<CoreOuput> {
    return this.friendService.addFriend(userUid, { email });
  }

  @Get()
  @UseGuards(JwtIdGuard)
  getFriends(@GetUserId() userUid: string): Promise<GetFriendsOutput> {
    return this.friendService.getFriends(userUid);
  }
}
