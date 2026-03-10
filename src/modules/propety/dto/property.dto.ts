import { ApiProperty } from '@nestjs/swagger';
import { PropertyType } from '../../../common/enum/enum';
import { IsOptional, IsString } from 'class-validator';

export class PropertyImageDto {
  images: string;
}

export class CreatePropertyDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsOptional()
  description?: string;

  @ApiProperty()
  @IsOptional()
  price?: number;

  @ApiProperty()
  pricePerMonth: number;

  @ApiProperty()
  @IsOptional()
  beds?: number;

  @ApiProperty()
  @IsOptional()
  baths?: number;

  @ApiProperty()
  @IsOptional()
  sqft?: number;

  @ApiProperty()
  type: PropertyType;

  @ApiProperty()
  state: string;

  @ApiProperty()
  address: string;

  @ApiProperty()
  ownerId: string;

  @ApiProperty()
  images?: PropertyImageDto[];

  @ApiProperty()
  amenities?: string;
}
