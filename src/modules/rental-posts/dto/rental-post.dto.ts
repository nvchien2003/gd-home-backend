import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  Min,
} from 'class-validator';

export class CreateRentalPostDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ example: 'Ho Chi Minh City' })
  @IsString()
  location: string;

  @ApiProperty({ example: 'apartment' })
  @IsString()
  roomType: string;

  @ApiProperty({ example: 750 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pricePerMonth: number;

  @ApiPropertyOptional({ example: 2 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  beds?: number;

  @ApiPropertyOptional({ example: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  baths?: number;

  @ApiPropertyOptional({ example: 650 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(0)
  sqft?: number;

  @ApiPropertyOptional({ type: [String] })
  @IsOptional()
  @IsArray()
  @IsUrl({ require_protocol: true }, { each: true })
  images?: string[];
}

export class UpdateRentalPostDto extends PartialType(CreateRentalPostDto) {
  @ApiPropertyOptional({ enum: ['active', 'inactive', 'rented'] })
  @IsOptional()
  @IsIn(['active', 'inactive', 'rented'])
  status?: string;
}

export class RentalPostQueryDto {
  @ApiPropertyOptional({ default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  limit?: number = 10;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  roomType?: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  status?: string;
}
