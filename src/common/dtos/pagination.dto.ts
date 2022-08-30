import { IsInt, IsOptional, Max } from 'class-validator';
import { CoreOuput } from './coreOutput.dto';

export class PaginationInput {
  @IsInt()
  page: number;

  @IsInt()
  @Max(30)
  take: number;
}

export class PaginationOutput extends CoreOuput {
  @IsOptional()
  @IsInt()
  totalPages?: number;

  @IsOptional()
  @IsInt()
  totalResult?: number;
}
