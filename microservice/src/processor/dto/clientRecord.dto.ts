import {
  IsBoolean,
  IsDate,
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  IsInt,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ClientRecordDTO {
  @IsNotEmpty()
  @IsString()
  @MaxLength(100)
  fullName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsInt()
  dni: number;

  @IsNotEmpty()
  @IsString()
  @MaxLength(10)
  status: string;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  entryDate: Date;

  @IsNotEmpty()
  @Type(() => Boolean)
  @IsBoolean()
  isPEP: boolean;

  @IsOptional()
  @Type(() => Boolean)
  @IsBoolean()
  isSubjectToObligation: boolean;

  @IsNotEmpty()
  @Type(() => Date)
  @IsDate()
  creationDate: Date;
}
