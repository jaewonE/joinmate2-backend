import { PartialType, PickType } from '@nestjs/swagger';
import { IsInt, IsObject, IsOptional, IsString, Min } from 'class-validator';
import { CoreOuput } from '../../common/dtos/coreOutput.dto';
import { User } from '../entities/user.entity';

export class CreateAccountInput extends PickType(User, [
  'email',
  'password',
  'name',
]) {}

export class CreateAccountOutput extends CoreOuput {
  @IsOptional()
  @IsString()
  token?: string;
}

export class SignInInput extends PickType(User, ['email', 'password']) {}

export class SignInOutput extends CoreOuput {
  @IsOptional()
  @IsString()
  token?: string;
}

export class FindUserInput extends PickType(User, ['id']) {}

export class SearchUserInput extends PickType(User, ['email']) {}

export class FindUserOutput extends CoreOuput {
  @IsOptional()
  @IsObject()
  user?: User;
}

export class UpdateUserInput extends PartialType(
  PickType(User, ['name', 'email', 'password', 'coverImg', 'bgCoverImg']),
) {}
