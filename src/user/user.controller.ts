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
  SignInInput,
  SignInOutput,
  UpdateUserInput,
} from './dtos/userCRUD.dto';
import { User } from './entities/user.entity';
import { JwtGuard } from './guards/user.guard';
import { JwtIdGuard } from './guards/userId.guard';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @UseGuards(JwtGuard)
  getUser(@GetUser() user: User): User {
    return user;
  }

  @Post()
  createAccount(
    @Body() createAccountInput: CreateAccountInput,
  ): Promise<CreateAccountOutput> {
    return this.userService.createAccount(createAccountInput);
  }

  @Get('find/:id')
  findUser(@Param('id') findUserId: number): Promise<FindUserOutput> {
    return this.userService.findUser({ id: findUserId });
  }

  @Get('search/:email')
  searchUser(@Param('email') searchUserEmail: string): Promise<FindUserOutput> {
    return this.userService.searchUser({ email: searchUserEmail });
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
  deleteUser(@GetUserId() userId: number): Promise<CoreOuput> {
    return this.userService.deleteUser(userId);
  }

  @Post('signin')
  signIn(@Body() signinInput: SignInInput): Promise<SignInOutput> {
    return this.userService.signIn(signinInput);
  }
}
