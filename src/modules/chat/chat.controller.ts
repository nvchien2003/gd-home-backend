import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Sse,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { Observable } from 'rxjs';
import { UserReq } from '../../common/decorators/user.decorator';
import { AuthorizationGuard } from '../auth/authorization.guard';
import { UserJwtDto } from '../auth/dto/auth.dto';
import { ChatService } from './chat.service';
import { CreateConversationDto, SendMessageDto } from './dto/chat.dto';

@ApiTags('chat')
@ApiBearerAuth()
@UseGuards(AuthorizationGuard)
@Controller('chat')
export class ChatController {
  constructor(private readonly chatService: ChatService) {}

  @Get('conversations')
  findConversations(@UserReq() user: UserJwtDto) {
    return this.chatService.findConversations(user.id);
  }

  @Post('conversations')
  createConversation(
    @UserReq() user: UserJwtDto,
    @Body() dto: CreateConversationDto,
  ) {
    return this.chatService.createConversation(user.id, dto);
  }

  @Get('conversations/:id/messages')
  findMessages(@UserReq() user: UserJwtDto, @Param('id') id: string) {
    return this.chatService.findMessages(user.id, id);
  }

  @Post('conversations/:id/messages')
  sendMessage(
    @UserReq() user: UserJwtDto,
    @Param('id') id: string,
    @Body() dto: SendMessageDto,
  ) {
    return this.chatService.sendMessage(user.id, id, dto);
  }

  @Sse('events')
  events(): Observable<MessageEvent> {
    return this.chatService.stream();
  }
}
