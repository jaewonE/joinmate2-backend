import { PickType } from '@nestjs/swagger';
import { IsArray, IsOptional } from 'class-validator';
import { CoreOuput } from '../../common/dtos/coreOutput.dto';
import { User } from '../entities/user.entity';
import { FindUserInput } from './user.dto';

export class AddFriendInput extends PickType(User, ['email']) {}

export class GetFriendsOutput extends CoreOuput {
  @IsOptional()
  @IsArray()
  friends?: User[];
}

export class DeleteFriendsInput {
  @IsArray()
  uidList: string[];
}
