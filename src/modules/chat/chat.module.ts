import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Conversation } from '../../database/entities/conversation.entity';
import { Message } from '../../database/entities/message.entity';
import { User } from '../../database/entities/user.entity';
import { AuthModule } from '../auth/auth.module';
import { ChatController } from './chat.controller';
import { ChatEventsService } from './chat-events.service';
import { ChatService } from './chat.service';

@Module({
  imports: [TypeOrmModule.forFeature([Conversation, Message, User]), AuthModule],
  controllers: [ChatController],
  providers: [ChatService, ChatEventsService],
})
export class ChatModule {}
