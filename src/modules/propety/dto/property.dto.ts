import { ApiProperty, ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsEnum,
  IsIn,
  IsInt,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  IsUrl,
  Max,
  Min,
  ValidateNested,
} from 'class-validator';
import { PropertyType } from '../../../common/enum/enum';

export class OwnerDto {
  @ApiProperty({ example: 'Sarah Johnson' })
  @IsString()
  name: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  })
  @IsUrl({ require_protocol: true })
  image: string;
}

export class BasePropertyDto {
  @ApiProperty({ example: 'Modern Downtown Apartment' })
  @IsString()
  title: string;

  @ApiProperty({ example: 'San Francisco, CA' })
  @IsString()
  location: string;

  @ApiProperty({ example: 850000 })
  @Type(() => Number)
  @IsNumber()
  @IsPositive()
  price: number;

  @ApiProperty({ example: 4200 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  pricePerMonth: number;

  @ApiProperty({ example: 3 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  beds: number;

  @ApiProperty({ example: 2 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  baths: number;

  @ApiProperty({ example: 1450 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  sqft: number;

  @ApiProperty({ enum: PropertyType, example: PropertyType.APARTMENT })
  @IsEnum(PropertyType)
  type: PropertyType;

  @ApiProperty({ example: 4.8 })
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @Max(5)
  rating: number;

  @ApiProperty({ example: 124 })
  @Type(() => Number)
  @IsInt()
  @Min(0)
  reviews: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
  })
  @IsUrl({ require_protocol: true })
  image: string;

  @ApiProperty({ example: ['Pool', 'Gym', 'Parking'], type: [String] })
  @IsArray()
  @IsString({ each: true })
  amenities: string[];

  @ApiProperty({
    example:
      'A bright modern apartment with open living spaces and premium finishes.',
  })
  @IsString()
  description: string;

  @ApiProperty({ type: OwnerDto })
  @ValidateNested()
  @Type(() => OwnerDto)
  owner: OwnerDto;
}

export class CreatePropertyDto extends BasePropertyDto {}

export class UpdatePropertyDto extends PartialType(BasePropertyDto) {}

export class GetPropertiesQueryDto {
  @ApiPropertyOptional({ example: 1, default: 1 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  page?: number = 1;

  @ApiPropertyOptional({ example: 10, default: 10 })
  @IsOptional()
  @Type(() => Number)
  @IsInt()
  @Min(1)
  @Max(100)
  limit?: number = 10;

  @ApiPropertyOptional({ example: 'downtown' })
  @IsOptional()
  @IsString()
  search?: string;

  @ApiPropertyOptional({ enum: PropertyType })
  @IsOptional()
  @IsEnum(PropertyType)
  type?: PropertyType;

  @ApiPropertyOptional({ example: 250000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  minPrice?: number;

  @ApiPropertyOptional({ example: 1000000 })
  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  maxPrice?: number;

  @ApiPropertyOptional({ enum: ['price', 'rating', 'latest'], default: 'latest' })
  @IsOptional()
  @IsIn(['price', 'rating', 'latest'])
  sort?: 'price' | 'rating' | 'latest' = 'latest';

  @ApiPropertyOptional({ enum: ['ASC', 'DESC'], default: 'DESC' })
  @IsOptional()
  @IsIn(['ASC', 'DESC'])
  order?: 'ASC' | 'DESC' = 'DESC';
}

export class OwnerResponseDto {
  @ApiProperty({ example: 'Sarah Johnson' })
  name: string;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330',
  })
  image: string;
}

export class PropertyResponseDto {
  @ApiProperty({ example: 1 })
  id: number;

  @ApiProperty({ example: 'Modern Downtown Apartment' })
  title: string;

  @ApiProperty({ example: 'San Francisco, CA' })
  location: string;

  @ApiProperty({ example: 850000 })
  price: number;

  @ApiProperty({ example: 4200 })
  pricePerMonth: number;

  @ApiProperty({ example: 3 })
  beds: number;

  @ApiProperty({ example: 2 })
  baths: number;

  @ApiProperty({ example: 1450 })
  sqft: number;

  @ApiProperty({ example: 'apartment' })
  type: string;

  @ApiProperty({ example: 4.8 })
  rating: number;

  @ApiProperty({ example: 124 })
  reviews: number;

  @ApiProperty({
    example: 'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2',
  })
  image: string;

  @ApiProperty({ example: ['Pool', 'Gym', 'Parking'], type: [String] })
  amenities: string[];

  @ApiProperty({
    example:
      'A bright modern apartment with open living spaces and premium finishes.',
  })
  description: string;

  @ApiProperty({ type: OwnerResponseDto })
  owner: OwnerResponseDto;
}
