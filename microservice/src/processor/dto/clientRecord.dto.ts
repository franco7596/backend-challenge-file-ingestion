import { IsBoolean, IsDate, IsNotEmpty, IsOptional, IsString, IsNumber } from 'class-validator';
import { Type } from 'class-transformer';

export class ClientRecordDTO {
  @IsNotEmpty()
  @IsString()
  fullName: string;

  @IsNotEmpty()
  @Type(() => Number)
  @IsNumber()
  dni: number;

  @IsNotEmpty()
  @IsString()
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