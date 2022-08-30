import { IsBoolean, IsOptional, IsString } from 'class-validator';

export class CoreOuput {
  @IsBoolean()
  status: boolean;

  @IsOptional()
  @IsString()
  error?: string;
}
