import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Conversation } from '../../database/entities/conversation.entity';
import { Message } from '../../database/entities/message.entity';
import { User } from '../../database/entities/user.entity';
import { ChatEventsService } from './chat-events.service';
import { CreateConversationDto, SendMessageDto } from './dto/chat.dto';

@Injectable()
export class ChatService {
  constructor(
    @InjectRepository(Conversation)
    private readonly conversationRepository: Repository<Conversation>,
    @InjectRepository(Message)
    private readonly messageRepository: Repository<Message>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly events: ChatEventsService,
  ) {}

  async findConversations(userId: string) {
    const conversations = await this.conversationRepository
      .createQueryBuilder('conversation')
      .leftJoinAndSelect('conversation.user', 'user')
      .leftJoinAndSelect('conversation.owner', 'owner')
      .leftJoinAndSelect('conversation.messages', 'messages')
      .where('user.id = :userId OR owner.id = :userId', { userId })
      .orderBy('conversation.updatedAt', 'DESC')
      .addOrderBy('messages.createdAt', 'DESC')
      .getMany();

    return conversations.map((conversation) => this.toConversation(conversation));
  }

  async createConversation(userId: string, dto: CreateConversationDto) {
    const owner = await this.userRepository.findOne({
      where: { id: dto.ownerId },
    });

    if (!owner) {
      throw new NotFoundException('Owner not found');
    }

    let conversation = await this.conversationRepository.findOne({
      where: { user: { id: userId }, owner: { id: dto.ownerId } },
      relations: ['user', 'owner', 'messages'],
    });

    if (!conversation) {
      conversation = await this.conversationRepository.save({
        user: { id: userId },
        owner: { id: dto.ownerId },
      });
    }

    return this.findConversation(userId, conversation.id);
  }

  async findConversation(userId: string, id: string) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['user', 'owner', 'messages', 'messages.sender'],
      order: { messages: { createdAt: 'ASC' } },
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    this.assertParticipant(conversation, userId);
    return this.toConversation(conversation);
  }

  async findMessages(userId: string, id: string) {
    await this.findConversation(userId, id);
    const messages = await this.messageRepository.find({
      where: { conversation: { id } },
      relations: ['sender'],
      order: { createdAt: 'ASC' },
    });

    return messages.map((message) => this.toMessage(message));
  }

  async sendMessage(userId: string, id: string, dto: SendMessageDto) {
    const conversation = await this.conversationRepository.findOne({
      where: { id },
      relations: ['user', 'owner'],
    });

    if (!conversation) {
      throw new NotFoundException('Conversation not found');
    }

    this.assertParticipant(conversation, userId);

    const message = await this.messageRepository.save({
      conversation: { id },
      sender: { id: userId },
      body: dto.body,
    });

    await this.conversationRepository.update(id, { updatedAt: new Date() });

    const saved = await this.messageRepository.findOne({
      where: { id: message.id },
      relations: ['sender'],
    });
    const payload = {
      type: 'chat.message',
      conversationId: id,
      message: this.toMessage(saved),
    };
    this.events.emit(payload);
    return payload.message;
  }

  stream() {
    return this.events.stream();
  }

  private assertParticipant(conversation: Conversation, userId: string) {
    if (conversation.user.id !== userId && conversation.owner.id !== userId) {
      throw new ForbiddenException('You do not have access to this conversation');
    }
  }

  private toConversation(conversation: Conversation) {
    const messages = conversation.messages ?? [];
    const lastMessage = messages.length
      ? this.toMessage([...messages].sort(
          (a, b) => b.createdAt.getTime() - a.createdAt.getTime(),
        )[0])
      : null;

    return {
      id: conversation.id,
      user: this.toUser(conversation.user),
      owner: this.toUser(conversation.owner),
      lastMessage,
      createdAt: conversation.createdAt,
      updatedAt: conversation.updatedAt,
    };
  }

  private toMessage(message: Message) {
    return {
      id: message.id,
      conversationId: message.conversation?.id,
      sender: this.toUser(message.sender),
      body: message.body,
      readAt: message.readAt,
      createdAt: message.createdAt,
    };
  }

  private toUser(user?: User) {
    return user
      ? {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          avatar: user.avatar,
        }
      : null;
  }
}
