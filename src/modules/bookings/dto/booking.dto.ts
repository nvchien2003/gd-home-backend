import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsIn, IsInt, IsOptional } from 'class-validator';

export class CreateBookingDto {
  @ApiProperty()
  @Type(() => Number)
  @IsInt()
  propertyId: number;

  @ApiProperty({ example: '2026-06-01' })
  @IsDateString()
  startDate: string;

  @ApiProperty({ example: '2026-06-05' })
  @IsDateString()
  endDate: string;
}

export class UpdateBookingDto {
  @ApiPropertyOptional({ enum: ['pending', 'confirmed', 'cancelled', 'completed'] })
  @IsOptional()
  @IsIn(['pending', 'confirmed', 'cancelled', 'completed'])
  status?: string;
}
