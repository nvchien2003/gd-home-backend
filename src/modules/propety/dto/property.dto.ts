import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import {
  IsString,
  IsNumber,
  IsOptional,
  IsEnum,
  IsArray,
} from 'class-validator';
import { Type } from 'class-transformer';
import { PropertyType } from '../../../common/enum/enum';

export class BasePropertyDto {
  @ApiProperty({
    example: 'Luxury Apartment',
    description: 'Property title',
  })
  @IsString()
  title: string;

  @ApiProperty({
    example: 'Beautiful apartment in city center',
  })
  @IsString()
  description: string;

  @ApiProperty({
    example: 200000,
    description: 'Property price',
  })
  @Type(() => Number)
  @IsNumber()
  price: number;

  @ApiPropertyOptional({
    example: 1500,
    description: 'Monthly price',
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  pricePerMonth?: number;

  @ApiPropertyOptional({
    example: 3,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  beds?: number;

  @ApiPropertyOptional({
    example: 2,
  })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  baths?: number;

  @ApiProperty({
    example: 120,
    description: 'Square feet',
  })
  @Type(() => Number)
  @IsNumber()
  sqft: number;

  @ApiProperty({
    enum: PropertyType,
    example: PropertyType.APARTMENT,
  })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty()
  @IsString()
  address: string;

  @ApiProperty()
  @IsString()
  state: string;

  @ApiProperty()
  @IsArray()
  amenities: string[];

  @ApiPropertyOptional()
  @IsOptional()
  @IsArray()
  medias?: string[];
}

export class CreatePropertyDto extends PartialType(BasePropertyDto) {}
