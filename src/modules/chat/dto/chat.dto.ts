import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength } from 'class-validator';

export class CreateConversationDto {
  @ApiProperty()
  @IsString()
  ownerId: string;
}

export class SendMessageDto {
  @ApiProperty()
  @IsString()
  @MinLength(1)
  body: string;
}
