import { PartialType, PickType } from '@nestjs/swagger';
import { IsObject, IsOptional, IsString } from 'class-validator';
import { CoreOuput } from '../../common/dtos/coreOutput.dto';
import { User } from '../entities/user.entity';

export class CreateAccountInput extends PickType(User, [
  'uid',
  'name',
  'email',
  'emailVerified',
  'signInType',
  'coverImg',
  'bgCoverImg',
]) {}

export class CreateAccountOutput extends CoreOuput {
  @IsOptional()
  @IsString()
  token?: string;
}

export class SignTokenInput extends PickType(User, ['uid']) {}

export class SignTokenOutput extends CoreOuput {
  @IsOptional()
  @IsString()
  token?: string;
}

export class FindUserInput extends PickType(User, ['uid']) {}

export class SearchUserInput extends PickType(User, ['email']) {}

export class FindUserOutput extends CoreOuput {
  @IsOptional()
  @IsObject()
  user?: User;
}

export class UpdateUserInput extends PartialType(
  PickType(User, ['name', 'email', 'signInType', 'coverImg', 'bgCoverImg']),
) {}
